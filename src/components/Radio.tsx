import { useState } from 'react';
import '../styles/radio.scss';

const Radio = (props: { handleClick: () => any; initialState?: boolean }) => {
  const [isCompleted, setIsCompleted] = useState(props.initialState || false);

  return (
    <input
      type='radio'
      onClick={() => {
        setIsCompleted(!isCompleted);
        props.handleClick();
      }}
      readOnly
      checked={isCompleted}
      className='col-1 mx-sm-4 ms-3 radio'
      style={{ cursor: 'pointer' }}
    />
  );
};

export default Radio;
