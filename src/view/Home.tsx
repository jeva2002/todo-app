import { useState } from 'react';
import CreateTodo from '../components/CreateTodo';
import TodoList from '../components/TodoList';

export interface ITodo {
  id: string | number;
  text: string;
  state: string;
}

function Home() {
  const [todoList, setTodoList] = useState<ITodo[] | never[]>([]);

  return (
    <>
      <CreateTodo setTodoList={setTodoList}/>
      <TodoList todoList={todoList} setTodoList={setTodoList}/>
    </>
  );
}

export default Home;
