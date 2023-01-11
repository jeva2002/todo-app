import { useEffect, useState, Dispatch, SetStateAction} from 'react';
import { clearCompleted, getTodos } from '../functions/request';
import Filter from './Filter';
import renderTodoes from './RenderTodoes';
import { ITodo } from '../view/Home';

const getLeftItems = (todoList: ITodo[] | never[]) => {
  return todoList.filter((e) => e.state === 'pending').length;
};

const TodoList = (props: {
  todoList: never[] | ITodo[],
  setTodoList: Dispatch<SetStateAction<never[] | ITodo[]>>
}) => {

  const [leftItems, setLeftItems] = useState(0);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getTodos().then((res) => {
      props.setTodoList(res);
      setLeftItems(getLeftItems(res));
    });
  }, []);

  return (
    <section
      className='container d-flex flex-column gap-1'
      style={{ width: '600px' }}
    >
      {renderTodoes(props.todoList, props.setTodoList, leftItems, setLeftItems, filter)}
      <div className='row d-flex px-4'>
        <h4 className='col-3 text-center'>{leftItems} items left</h4>
        <div className='col-6 d-flex gap-2 justify-content-center'>
          <Filter setFilter={setFilter} text='All' filter='' />
          <Filter setFilter={setFilter} text='Active' filter='pending' />
          <Filter setFilter={setFilter} text='Completed' filter='done' />
        </div>
        <h4
          className='col-3 text-end'
          onClick={() => {
            clearCompleted(
              props.todoList.filter((e) => e.state === 'done').map((e) => e.id)
            );
            props.setTodoList(props.todoList.filter((e) => e.state !== 'done'));
          }}
        >
          Clear Completed
        </h4>
      </div>
    </section>
  );
};

export default TodoList;
