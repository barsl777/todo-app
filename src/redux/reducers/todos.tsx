import { ADD_TODO, EDIT_TODO, DONE_TODO } from "../actionTypes";
import { InitState } from "../../models/models";

const initialState: InitState = {
  todos: []
};

const todos = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        todos: [...state.todos, { id, content }],
      };
    }
    case EDIT_TODO: {
      const { id, content } = action.payload;
      const updateTodos = state.todos.map(todo => {
        if (todo.id === id) todo.content = content;
        return todo;
      });
      return {
        ...state,
        todos: updateTodos
      }
    }
    case DONE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id)
      }
    }
    default:
      return state;
  }
}

export default todos;