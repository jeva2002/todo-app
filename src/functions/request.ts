import axios, { AxiosInstance } from 'axios';
import { ITodo } from '../view/Home';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://json-server-vercel-blue.vercel.app/posts',
});

const getTodos = async (filter?: string) => {
  if (filter) {
    return await (
      await instance.get(`?state=${filter}`)
    ).data;
  }
  return await (
    await instance.get('')
  ).data;
};

const createTodo = async (text: string, state: boolean) => {
  return await instance.post('', {
    text: text,
    state: state ? 'done' : 'pending',
  });
};

const modifyState = async (todoState: string, id: string | number) => {
  return await instance.patch('/' + id, {
    state: todoState,
  });
};

const deleteTodo = async (id: string | number) => {
  return await instance.delete('/' + id);
};

const clearCompleted = (ids: (string | number)[] | ITodo[]) => {
  const recursive = (number = 0): any => {
    if (ids.length === number) return;
    setTimeout(() => {
      instance.delete('/' + ids[number]);
      return recursive(number + 1);
    }, 500);
  };
  recursive();
};

export { getTodos, createTodo, modifyState, deleteTodo, clearCompleted };
