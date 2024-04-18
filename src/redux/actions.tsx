import { ADD_TODO, EDIT_TODO, DONE_TODO, } from "./actionTypes";

let nextTodoId = 0;

export const addTodo = (content: string) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const editTodo = (id: number, content: string) => ({
  type: EDIT_TODO,
  payload: {
    id,
    content
  }
});

export const doneTodo = (id: number) => ({
  type: DONE_TODO,
  payload: { id }
});
