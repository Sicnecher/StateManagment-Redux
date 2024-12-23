import { TodoPreview } from "./TodoPreview.jsx";
const { Link } = ReactRouterDOM;
const { useSelector } = ReactRedux;
const { useEffect, useState } = React;

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
  useEffect(() => {
    console.log("todos", todos);
  }, [todos])
  return (
    todos &&
    todos.length > 0 && (
      <ul className="todo-list">
        {todos.map((todo, idx) => (
          <li key={todo._id}>
            <TodoPreview idx={idx} todo={todo} onToggleTodo={onToggleTodo} />
            <section>
              <i
                className="bi bi-trash3"
                onClick={() => onRemoveTodo(todo._id)}
              ></i>
              <button>
                <Link to={`/todo/${todo._id}`}>Details</Link>
              </button>
              <Link to={`/todo/edit/${todo._id}`}>
                <i className="bi bi-pencil-square"></i>
              </Link>
            </section>
          </li>
        ))}
      </ul>
    )
  );
}
