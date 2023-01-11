import { useState, useContext } from 'react';
import { createTodo, getTodos } from '../functions/request';
import { ITodo } from '../view/Home';
import { getLeftItems } from '../view/Home';
import Radio from './Radio';
import { ListContext } from '../view/Home';

export interface NewTodo {
  text: string;
  state: boolean;
}

const CreateTodo = () => {
  const [newTodo, setNewTodo] = useState<NewTodo>({
    text: '',
    state: false,
  });

  const { setTodoList, setLeftItems } = useContext(ListContext);

  const handleClickRadio = () => {
    setNewTodo({
      text: newTodo.text,
      state: !newTodo.state,
    });
  };

  return (
    <section
      className='container d-flex flex-column gap-1 my-3 py-3'
      style={{ maxWidth: '600px' }}
    >
      <form
        className='d-flex align-items-center row flex-no-wrap'
        onSubmit={async (e) => {
          e.preventDefault();
          await createTodo(newTodo.text, newTodo.state);
          getTodos().then((res: ITodo[]) => {
            setTodoList(res);
            setLeftItems(getLeftItems(res));
          });
        }}
      >
        <Radio handleClick={handleClickRadio} />
        <input
          className={`col-sm-10 col-8 ${newTodo.state ? 'completed' : ''}`}
          style={{
            fontSize: '22px',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
          }}
          placeholder='Create a new to do...'
          name='text'
          onChange={(e) => {
            console.log();
            setNewTodo({
              text: e.target.value,
              state: newTodo.state,
            });
          }}
        />
      </form>
    </section>
  );
};

export default CreateTodo;
