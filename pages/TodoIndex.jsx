import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { DataTable } from "../cmps/data-table/DataTable.jsx";
import {
  showErrorMsg,
  showRemoveConfirmMsg,
  showSuccessMsg,
} from "../services/event-bus.service.js";
import { stateTodoActions } from "../store/action/todo.actions.js";

const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useSelector, useDispatch } = ReactRedux;

export function TodoIndex() {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todoModule.todos);

  const filterBy = useSelector((state) => state.todoModule.filterBy);

  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(filterBy);
    stateTodoActions.loadTodos(filterBy);
  }, [filterBy]);

  const onRemoveTodo = (todoId) => {
    showRemoveConfirmMsg("Are you sure you want to delete?", () => {
      stateTodoActions.removeTodo(todoId);
    });
  };

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone };
    return stateTodoActions.saveTodo(todoToSave);
  }

  if (!todos) return <div>Loading...</div>;
  return (
    <section className="todo-index">
      <h2>Todos List</h2>
      <TodoFilter />
      <button>
        <Link to="/todo/edit">
          Add Todo
        </Link>
      </button>
      <TodoList onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: "60%", margin: "auto" }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
    </section>
  );
}
