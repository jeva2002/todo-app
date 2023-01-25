import { useState, useContext } from 'react';
import { deleteTodo, modifyState } from '../functions/request';
import { ListContext } from '../view/Home';
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

  const { setModify } = useContext(ListContext);

  const handleClick = async () => {
    setComplete(!todoCompleted);
    await modifyState(!todoCompleted ? 'done' : 'pending', props.id);
    setModify((value) => !value);
  };

  return (
    <article className='d-flex align-items-center justify-content-between row py-2 flex-no-wrap'>
      <Radio handleClick={handleClick} initialState={todoCompleted} />
      <h2 className={`col-sm-8 col-5 pt-2 ${todoCompleted ? 'completed' : ''}`}>
        {props.text}
      </h2>
      <figure className='col-2 me-2 d-flex justify-content-center align-items-center'>
        <img
          src={close}
          alt='close-icon'
          className='col-1 close'
          style={{
            width: '40px',
            cursor: 'pointer',
            position: 'relative',
            top: '8px',
          }}
          onClick={async () => {
            await deleteTodo(props.id);
            setModify((value) => !value);
          }}
        />
      </figure>
    </article>
  );
};

export default Todo;
