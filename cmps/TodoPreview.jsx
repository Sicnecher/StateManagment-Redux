const { useSelector } = ReactRedux;
const { useEffect } = React;

export function TodoPreview({ todo, idx, onToggleTodo }) {
  return (
    <article className="todo-preview" style={todo.color && { backgroundColor: todo.color }}>
      <h2
        className={todo.isDone ? "done" : ""}
        onClick={() => onToggleTodo({...todo, isDone: !todo.isDone})}
      >
        Todo: {todo.txt}
      </h2>
      <h4>Todo Importance: {todo.importance}</h4>
      <img src={`../assets/img/${"todo"}.png`} alt="" />
    </article>
  );
}
