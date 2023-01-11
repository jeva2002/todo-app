import { useState } from 'react';

const CreateTodo = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <section
      className='container d-flex flex-column gap-1 my-3'
      style={{ width: '600px' }}
    >
      <form className='d-flex align-items-center row'>
        <input
          type='radio'
          onClick={() => {
            setIsCompleted(!isCompleted);
          }}
          readOnly
          checked={isCompleted}
          className='col-3'
          style={{ height: '25px', cursor: 'pointer' }}
        />
        <input
          className={`col-9 ${isCompleted ? 'completed' : ''}`}
          style={{ fontSize: '25px', border: 'none', outline: 'none' }}
          placeholder='Create a new to do...'
        />
      </form>
    </section>
  );
};

export default CreateTodo;
