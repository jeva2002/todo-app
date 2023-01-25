import Todo from './Todo';
import { ITodo } from '../view/Home';

const renderTodoes = (todoList: ITodo[] | never[], filter?: string) => {
  return todoList
    .filter((e) => (filter !== '' ? e.state === filter : e))
    .map((e, index) => {
      return <Todo key={index} id={e.id} state={e.state} text={e.text} />;
    });
};

export default renderTodoes;
