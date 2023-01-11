import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";

export interface IAppProps {
}

function Home (props: IAppProps) {
  return (
    <>
      <CreateTodo />
      <TodoList />
    </>
  );
}

export default Home;