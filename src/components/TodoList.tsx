import { useEffect, useState, useContext} from 'react';
import { clearCompleted, getTodos } from '../functions/request';
import Filter from './Filter';
import renderTodoes from './RenderTodoes';
import { ITodo } from '../view/Home';
import { getLeftItems } from '../view/Home';
import { ListContext } from '../view/Home';

const TodoList = () => {

  const [filter, setFilter] = useState('');
  const {setTodoList, setLeftItems, todoList, leftItems } = useContext(ListContext);

  useEffect(() => {
    getTodos().then((res) => {
      setTodoList(res);
      setLeftItems(getLeftItems(res));
    });
  }, []);

  return (
    <section
      className='container d-flex flex-column gap-1 todo-list'
      style={{ maxWidth: '600px' }}
    >
      {renderTodoes(todoList, filter)}
      <div className='row d-flex py-3 px-1 justify-content-between align-items-center'>
        <h5 className='col-3 text-center hidden'>{leftItems} items left</h5>
        <div className='col-sm-5 d-flex justify-content-center align-items-center'>
          <Filter setFilter={setFilter} text='All' filter='' />
          <Filter setFilter={setFilter} text='Active' filter='pending' />
          <Filter setFilter={setFilter} text='Completed' filter='done' />
        </div>
        <h4
          className='col-4 text-end pt-1 hidden'
          onClick={() => {
            clearCompleted(
              todoList.filter((e: ITodo) => e.state === 'done').map((e: ITodo) => e.id)
            );
            setTodoList(todoList.filter((e:ITodo) => e.state !== 'done'));
          }}
        >
          Clear Completed
        </h4>
      </div>
    </section>
  );
};

export default TodoList;
