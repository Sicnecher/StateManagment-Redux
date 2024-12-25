import { TodoPreview } from "./TodoPreview.jsx";
const { Link } = ReactRouterDOM;
const { useSelector } = ReactRedux;
const { useEffect, useState } = React;

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
  return (
    todos &&
    todos.length > 0 && (
      <ul className="todo-list">
        {todos.map((todo, idx) => (
          <li
            key={todo._id}
            style={todo.color && { backgroundColor: todo.color }}
          >
            <TodoPreview idx={idx} todo={todo} onToggleTodo={onToggleTodo} />
            <section className="buttons-container">
              <i
                className="bi bi-trash3 icon-large"
                onClick={() => onRemoveTodo(todo._id)}
              ></i>
              <button>
                <Link to={`/todo/${todo._id}`}>Details</Link>
              </button>
              <Link to={`/todo/edit/${todo._id}`}>
                <i className="bi bi-pencil-square icon-large"></i>
              </Link>
            </section>
          </li>
        ))}
      </ul>
    )
  );
}
