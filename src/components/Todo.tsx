import { useState, useContext } from 'react';
import { deleteTodo, getTodos, modifyState } from '../functions/request';
import { getLeftItems, ITodo, ListContext } from '../view/Home';
import Radio from './Radio';
import close from '../assets/close-icon.svg';


interface IAppProps {
  id: string | number;
  text: string;
  state: string;
}

const Todo = (props: IAppProps) => {
  const [todoCompleted, setComplete] = useState(
    props.state === 'done' ? true : false
  );

  const {setTodoList, setLeftItems, todoList} = useContext(ListContext)

  const handleClick = () => {
    setComplete(!todoCompleted);
    modifyState(!todoCompleted ? 'done' : 'pending', props.id);
    getTodos().then((res: ITodo[]) => {
      setTodoList(res);
      setLeftItems(getLeftItems(res));
    });
  }

  return (
    <article className='d-flex align-items-center justify-content-between row py-2'>
      <Radio handleClick={handleClick} initialState={todoCompleted}/>
      <h2
        className={`col-8 pt-2 ${todoCompleted ? 'completed' : ''}`}
        style={{ fontSize: '22px' }}
      >
        {props.text}
      </h2>
      <img
        src={close}
        alt='close-icon'
        className='col-2'
        style={{
          height: '40px',
          cursor: 'pointer',
        }}
        onClick={() => {
          deleteTodo(props.id).then(() => {
            getTodos().then((res: ITodo[]) => {
              setTodoList(res);
              setLeftItems(getLeftItems(res));
            });
          })
          setTodoList(todoList.filter((e: ITodo) => e.id !== props.id));
        }}
      />
    </article>
  );
};

export default Todo;
