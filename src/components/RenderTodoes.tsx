import Todo from './Todo';
import { ITodo } from '../view/Home';

const renderTodoes = (
  todoList: ITodo[] | never[],
  filter?: string
) => {
    return todoList
      .filter((e) => (filter !== '' ? e.state === filter : e))
      .map((e) => {
        return (
          <Todo
            key={e.id}
            id={e.id}
            state={e.state}
            text={e.text}
          />
        );
      });
};

export default renderTodoes;
