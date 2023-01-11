import { useState, Dispatch, SetStateAction } from 'react';
import { deleteTodo, modifyState } from '../functions/request';
import close from '../assets/close-icon.svg';
import { ITodo } from '../view/Home';

interface IAppProps {
  id: string | number;
  text: string;
  state: string;
  deleteTodo: Dispatch<SetStateAction<ITodo[] | never[]>>;
  todoList: ITodo[] | never[];
  leftItems: number;
  setLeftItems: Dispatch<SetStateAction<number>>;
}

const Todo = (props: IAppProps) => {
  const [isCompleted, setIsCompleted] = useState(
    props.state === 'done' ? true : false
  );

  return (
    <article className='d-flex align-items-center row'>
      <input
        type='radio'
        onClick={() => {
          setIsCompleted(!isCompleted);
          modifyState(isCompleted ? 'pending' : 'done', props.id);
          props.setLeftItems(
            isCompleted ? props.leftItems + 1 : props.leftItems - 1
          );
        }}
        readOnly
        checked={isCompleted}
        className='col-3'
        style={{ height: '25px', cursor: 'pointer' }}
      />
      <h2
        className={`col-7 ${isCompleted ? 'completed' : ''}`}
        style={{ fontSize: '25px' }}
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
          deleteTodo(props.id);
          props.deleteTodo(props.todoList.filter((e) => e.id !== props.id));
        }}
      />
    </article>
  );
};

export default Todo;
