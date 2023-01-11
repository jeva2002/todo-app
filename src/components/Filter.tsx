import { Dispatch, SetStateAction } from 'react';

interface IAppProps {
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
  text: string;
}

const Filter = (props: IAppProps) => {
  return (
    <h4
      className='me-3 filter'
      onClick={() => {
        props.setFilter(props.filter);
      }}
    >
      {props.text}
    </h4>
  );
};

export default Filter;
