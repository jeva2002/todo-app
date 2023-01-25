import axios, { AxiosInstance } from 'axios';
import { ITodo } from '../view/Home';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://json-server-vercel-blue.vercel.app/posts',
});

const getTodos = async (filter?: string) => {
  try {
    if (filter) {
      return await (
        await instance.get(`?state=${filter}`)
      ).data;
    }
    return await (
      await instance.get('')
    ).data;
  } catch (error) {
    console.log(error)
  }
};

const createTodo = async (text: string, state: boolean) => {
  try {
    return await instance.post('', {
      text: text,
      state: state ? 'done' : 'pending',
    });
  } catch (error) {
    console.log(error)
  }
};

const modifyState = async (todoState: string, id: string | number) => {
  try {
    return await instance.patch('/' + id, {
      state: todoState,
    });
  } catch (error) {
    console.log(error)
  }
};

const deleteTodo = async (id: string | number) => {
  try {
    return await instance.delete('/' + id);
  } catch (error) {
    console.log(error)
  }
};

const clearCompleted = (ids: (string | number)[] | ITodo[]) => {
  try {
    const recursive = (number = 0): any => {
      if (ids.length === number) return;
      setTimeout(() => {
        instance.delete('/' + ids[number]);
        return recursive(number + 1);
      }, 500);
    };
    recursive();
  } catch (error) {
    console.log(error)
  }
};

export { getTodos, createTodo, modifyState, deleteTodo, clearCompleted };
