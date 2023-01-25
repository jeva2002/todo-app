import { useState, useContext } from 'react';
import { createTodo } from '../functions/request';
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

  const { setModify } = useContext(ListContext);

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
          setModify(value => !value)
        }}
      >
        <Radio handleClick={handleClickRadio} initialState={newTodo.state} />
        <input
          className={`col-sm-10 col-8 ${newTodo.state ? 'completed' : ''}`}
          style={{
            fontSize: '22px',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            appearance: 'none',
          }}
          placeholder='Create a new to do...'
          name='text'
          onChange={(e) => {
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
