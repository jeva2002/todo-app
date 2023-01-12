import { useState, createContext, Dispatch, SetStateAction } from 'react';
import CreateTodo from '../components/CreateTodo';
import TodoList from '../components/TodoList';
import sun from '../assets/sun-icon.svg';
import moon from '../assets/moon-icon.svg';

export interface ITodo {
  id: string | number;
  text: string;
  state: string;
}

export interface Context {
  todoList: ITodo[] | never[] | any;
  setTodoList: Dispatch<SetStateAction<ITodo[] | never[]>> | any;
  leftItems: number | any;
  setLeftItems: Dispatch<SetStateAction<number>> | any;
}

export const getLeftItems = (res: ITodo[]) => {
  return res.filter((e: ITodo) => e.state === 'pending').length;
};

export const ListContext = createContext<Context>({
  todoList: [],
  leftItems: 0,
  setTodoList: () => {},
  setLeftItems: () => {},
});

function Home() {
  const [todoList, setTodoList] = useState<ITodo[] | never[]>([]);
  const [leftItems, setLeftItems] = useState(0);
  const [iconTheme, setIconTheme] = useState(sun);
  const [theme, setTheme] = useState('dark');

  return (
    <ListContext.Provider
      value={{ todoList, setTodoList, leftItems, setLeftItems }}
    >
      <div className={theme + ' p-3'}>
        <main
          className={`d-flex flex-column align-items-sm-center justify-content-sm-center p-sm-3 py-5`}
        >
          <div
            className='d-flex justify-content-between pb-5 px-1 container'
            style={{ maxWidth: '600px' }}
          >
            <h1 className='text-start'>TODO</h1>
            <img
              className='me-3 theme'
              src={iconTheme}
              alt='Change theme'
              onClick={() => {
                theme === 'dark' ? setIconTheme(moon) : setIconTheme(sun);
                theme === 'dark' ? setTheme('light') : setTheme('dark');
              }}
              style={{
                cursor: 'pointer',
                height: '40px',
              }}
            />
          </div>
          <CreateTodo />
          <TodoList />
        </main>
      </div>
    </ListContext.Provider>
  );
}

export default Home;
