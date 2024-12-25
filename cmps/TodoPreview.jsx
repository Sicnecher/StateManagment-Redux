const { useSelector } = ReactRedux;
const { useEffect, useState } = React;

export function TodoPreview({ todo, idx, onToggleTodo }) {
  const [levelClass, setLevelClass] = useState("");
  useEffect(() => {
    setLevelClass(
      todo.importance <= 3
        ? "level-1"
        : todo.importance <= 6
        ? "level-2"
        : "level-3"
    );
  });
  if(levelClass === "") return <div>Loading...</div>
  return (
    <article className="todo-preview">
      <h3
        className={todo.isDone ? "done" : ""}
        onClick={() => onToggleTodo({ ...todo, isDone: !todo.isDone })}
      >
        Todo: {todo.txt}
      </h3>
      <div className="importance">
        <p className={`level-display ${levelClass}`}>Importance: </p> <p className={`number ${levelClass}`} style={{opacity: 0.75}}>{todo.importance}</p>
      </div>
    </article>
  );
}
