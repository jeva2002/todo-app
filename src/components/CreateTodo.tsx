import { useState, Dispatch, SetStateAction } from 'react';
import { createTodo, getTodos } from '../functions/request';
import { ITodo } from '../view/Home';
import { getLeftItems } from '../view/Home';

interface NewTodo {
  text: string;
  state: boolean;
}

const CreateTodo = (props: {
  setTodoList: Dispatch<SetStateAction<never[] | ITodo[]>>;
  setLeftItems: Dispatch<SetStateAction<number>>;
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [newTodo, setNewTodo] = useState<NewTodo>({
    text: '',
    state: isCompleted,
  });

  return (
    <section
      className='container d-flex flex-column gap-1 my-3 py-3'
      style={{ width: '600px' }}
    >
      <form
        className='d-flex align-items-center row'
        onSubmit={async (e) => {
          e.preventDefault();
          await createTodo(newTodo.text, newTodo.state);
          getTodos().then((res) => {
            props.setTodoList(res);
            props.setLeftItems(getLeftItems(res));
          });
        }}
      >
        <input
          type='radio'
          onClick={(e) => {
            setIsCompleted(!isCompleted);
            setNewTodo({
              text: newTodo.text,
              state: !isCompleted,
            });
          }}
          readOnly
          checked={isCompleted}
          className='col-3'
          style={{ height: '25px', cursor: 'pointer' }}
          name='radio'
        />
        <input
          className={`col-9 ${isCompleted ? 'completed' : ''}`}
          style={{ fontSize: '22px', border: 'none', outline: 'none', backgroundColor: 'transparent' }}
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
