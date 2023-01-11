import { useEffect, useState, Dispatch, SetStateAction} from 'react';
import { clearCompleted, getTodos } from '../functions/request';
import Filter from './Filter';
import renderTodoes from './RenderTodoes';
import { ITodo } from '../view/Home';
import { getLeftItems } from '../view/Home';

const TodoList = (props: {
  todoList: never[] | ITodo[],
  setTodoList: Dispatch<SetStateAction<never[] | ITodo[]>>,
  leftItems: number,
  setLeftItems: Dispatch<SetStateAction<number>>
}) => {

  const [filter, setFilter] = useState('');

  useEffect(() => {
    getTodos().then((res) => {
      props.setTodoList(res);
      props.setLeftItems(getLeftItems(res));
    });
  }, []);

  return (
    <section
      className='container d-flex flex-column gap-1'
      style={{ width: '600px' }}
    >
      {renderTodoes(props.todoList, props.setTodoList, props.leftItems, props.setLeftItems, filter)}
      <div className='row d-flex p-3'>
        <h5 className='col-3 text-center'>{props.leftItems} items left</h5>
        <div className='col-5 d-flex gap-2 justify-content-center align-items-center'>
          <Filter setFilter={setFilter} text='All' filter='' />
          <Filter setFilter={setFilter} text='Active' filter='pending' />
          <Filter setFilter={setFilter} text='Completed' filter='done' />
        </div>
        <h4
          className='col-4 text-end pt-1'
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
