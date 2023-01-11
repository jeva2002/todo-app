import { ITodo } from './TodoList';
import { Dispatch, SetStateAction } from 'react';
import Todo from './Todo';

const renderTodoes = (
  todoList: ITodo[] | never[],
  setTodoList: Dispatch<SetStateAction<ITodo[] | never[]>>,
  leftItems: number,
  setLeftItems: Dispatch<SetStateAction<number>>,
  filter?: string
) => {
    return todoList
      .filter((e) => (filter !== '' ? e.state === filter : e))
      .map((e) => {
        return (
          <Todo
            setLeftItems={setLeftItems}
            leftItems={leftItems}
            key={e.id}
            id={e.id}
            state={e.state}
            text={e.text}
            deleteTodo={setTodoList}
            todoList={todoList}
          />
        );
      });
};

export default renderTodoes;
