import { TodoPreview } from "./TodoPreview.jsx";
const { Link } = ReactRouterDOM;
const { useSelector } = ReactRedux;
const { useEffect } = React;

export function TodoList({ onRemoveTodo, onToggleTodo }) {
  const todos = useSelector((state) => state.todoModule.todos);
  useEffect(() => {
    console.log("TodoList todos:", todos);
  }, [todos]);
  return (
    todos &&
    todos.length > 0 && (
      <ul className="todo-list">
        {todos.map((todo, idx) => (
          <li key={todo._id}>
            <TodoPreview idx={idx} onToggleTodo={onToggleTodo} />
            <section>
              <i
                className="bi bi-trash3"
                onClick={() => onRemoveTodo(todo._id)}
              ></i>
              <button>
                <Link to={`/todo/${todo._id}`}>Details</Link>
              </button>
              <Link to={`/book/edit/${todo._id}`}>
                <i className="bi bi-pencil-square"></i>
              </Link>
            </section>
          </li>
        ))}
      </ul>
    )
  );
}
