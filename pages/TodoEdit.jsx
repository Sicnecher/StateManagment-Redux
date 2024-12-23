import { todoService } from "../services/todo.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { stateTodoActions } from "../store/action/todo.actions.js";
import { stateUserActions } from "../store/action/user.actions.js";

const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;
const { useSelector, useDispatch } = ReactRedux;

export function TodoEdit() {
  const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo());
  const navigate = useNavigate();
  const params = useParams();

  const user = useSelector((state) => state.userModule.loggedInUser);

  useEffect(() => {
    if (params.todoId) loadTodo();
  }, []);

  function loadTodo() {
    todoService
      .get(params.todoId)
      .then(setTodoToEdit)
      .catch((err) => console.log("err:", err));
  }

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setTodoToEdit((prevTodoToEdit) => ({ ...prevTodoToEdit, [field]: value }));
  }

  function onSaveTodo(ev) {
    ev.preventDefault();
    const formData = {
      txt: ev.target.txt.value,
      importance: ev.target.importance.value,
      isDone: ev.target.isDone.checked,
      color: ev.target.color.value,
      _id: params.todoId,
      updatedAt: Date.now(),
    };
    stateTodoActions
      .saveTodo(formData)
      .then((savedTodo) => {
        stateTodoActions.setDonePrecents();
        const updatedActivity = {
          title: params.todoId ? "Updated a todo" : "Added a todo",
          description: savedTodo.txt,
          time: Date.now(),
        };
        stateUserActions
          .updateUser({
            ...user,
            activities: [...user.activities, updatedActivity],
          })
          .then(() => {
            showSuccessMsg("Todo saved");
            navigate("/todo");
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot save todo");
      });
  }

  const { txt, importance, isDone, todoColor } = todoToEdit;

  return (
    <section className="todo-edit">
      <form onSubmit={onSaveTodo}>
        <section>
          <label htmlFor="txt">Text:</label>
          <input
            onChange={handleChange}
            value={txt}
            type="text"
            name="txt"
            id="txt"
          />
        </section>
        <section style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <label htmlFor="color">ToDo Color:</label>
          <input type="color" name="color" id="color" />
        </section>
        <section>
          <label htmlFor="importance">Importance:</label>
          <input
            onChange={handleChange}
            value={importance}
            type="number"
            name="importance"
            id="importance"
          />
        </section>
        <section>
          <label htmlFor="isDone">isDone:</label>
          <input
            onChange={handleChange}
            value={isDone}
            type="checkbox"
            name="isDone"
            id="isDone"
          />
        </section>
        <button>Save</button>
      </form>
    </section>
  );
}
