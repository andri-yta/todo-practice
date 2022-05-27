import { createSlice } from "@reduxjs/toolkit";
import { VisibilityFilters } from "../constant/cFilter";

const initialState = {
  todos: {},
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = action.payload;
      state.todos[todo.id] = todo;
    },
    updateTodoStatus: (state, action) => {
      const todoId = action.payload;
      const todo = state.todos[todoId];
      todo.complete = !todo.complete;
    },
    clearCompleted: (state) => {
      console.log(Object.keys(state.todos).length);

      Object.keys(state.todos).forEach(
        (key) => (state.todos[key].complete = false)
      );
    },
  },
});

export const { addTodo, updateTodoStatus, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;

import { nanoid } from "nanoid";

export const addNewTodo = (task) => async (dispatch) => {
  const initialTodo = { id: nanoid(), task, complete: false };
  dispatch(addTodo(initialTodo));
};

export const changeTodoStatus = (todoId) => async (dispatch) => {
  dispatch(updateTodoStatus(todoId));
};
