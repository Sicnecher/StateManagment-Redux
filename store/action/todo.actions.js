import { todoService } from "../../services/todo.service.js";
import {
  ADD_TODO,
  REMOVE_TODO,
  SET_TODOS,
  SET_IS_LOADING,
  UNDO_TODOS,
  UPDATE_TODO,
  SET_DONE_PERC,
} from "../reducers/todo.reducer.js";
import { store } from "../store.js";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../services/event-bus.service.js";
import { stateUserActions } from "./user.actions.js";

export const stateTodoActions = {
  loadTodos,
  removeTodo,
  removeTodoOptimistic,
  saveTodo,
  setDonePrecents,
};

function loadTodos(filterBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  return todoService
    .query(filterBy)
    .then((todos) => {
      store.dispatch({
        type: SET_TODOS,
        todos: todos[0] ? todos : "No matching todos.",
      });
    })
    .catch((err) => {
      console.log("todo action -> Cannot load todos", err);
      throw err;
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    });
}

async function removeTodo(todoId) {
  try {
    const data = await todoService.remove(todoId);
    store.dispatch({ type: REMOVE_TODO, todoId });
    showSuccessMsg("Todo removed");
    await setDonePrecents();
    return data;
  } catch (err) {
    console.log("todo action -> Cannot remove todo", err);
    showErrorMsg("Cannot remove todo");
    throw err;
  }
}

function removeTodoOptimistic(todoId) {
  store.todoModule.dispatch({ type: REMOVE_TODO, todoId });
  return todoService.remove(todoId).catch((err) => {
    store.dispatch({ type: UNDO_TODOS });
    console.log("todo action -> Cannot remove todo", err);
    throw err;
  });
}

async function saveTodo(todo) {
  const type = todo._id ? UPDATE_TODO : ADD_TODO;
  try {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });
    const savedTodo = await todoService.save(todo);
    store.dispatch({ type, todo: savedTodo });
    console.log("todo action -> Todo saved", savedTodo);
    showSuccessMsg(
      `Todo is ${savedTodo.isDone ? "finished" : "back on your list"}`
    );
    await setDonePrecents();
    return savedTodo;
  } catch (err) {
    showErrorMsg("Cannot save todo");
    console.log("todo action -> Cannot save todo", err, "todo:", todo);
    throw err;
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }
}

async function setDonePrecents() {
  const todos = await todoService.query();
  const doneTodos = todos.filter((todo) => todo.isDone);
  const donePerc = `${Math.round((doneTodos.length / todos.length) * 100)}%`;
  store.dispatch({ type: SET_DONE_PERC, donePerc });
}
