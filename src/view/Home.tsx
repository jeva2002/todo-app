import { useState } from 'react';
import CreateTodo from '../components/CreateTodo';
import TodoList from '../components/TodoList';
import desktopDark from '../assets/bg-desktop-dark.jpg';
import desktopLight from '../assets/bg-desktop-light.jpg';
import sun from '../assets/sun-icon.svg';
import moon from '../assets/moon-icon.svg';

export interface ITodo {
  id: string | number;
  text: string;
  state: string;
}

export const getLeftItems = (todoList: ITodo[] | never[]) => {
  return todoList.filter((e) => e.state === 'pending').length;
};

function Home() {
  const [todoList, setTodoList] = useState<ITodo[] | never[]>([]);
  const [leftItems, setLeftItems] = useState(0);
  const [iconTheme, setIconTheme] = useState(sun);
  const [theme, setTheme] = useState('dark');

  return (
    <>
      <div className={`bg bg-${theme}`}>
        <img src={theme === 'dark' ? desktopDark : desktopLight} alt='bg' />
      </div>
      <main className={`d-flex flex-column align-items-center justify-content-center ${theme}`}>
        <div
          className='d-flex justify-content-between py-2 px-5'
          style={{ width: '600px' }}
        >
          <h1 className='text-start'>TODO</h1>
          <img
            src={iconTheme}
            alt='Change theme'
            onClick={() => {
              theme === 'dark' ? setIconTheme(moon) : setIconTheme(sun);
              theme === 'dark' ? setTheme('ligth') : setIconTheme('dark');
            }}
            style={{
              cursor: 'pointer',
              height: '40px'
            }}
          />
        </div>
        <CreateTodo setTodoList={setTodoList} setLeftItems={setLeftItems} />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          leftItems={leftItems}
          setLeftItems={setLeftItems}
        />
      </main>
    </>
  );
}

export default Home;
