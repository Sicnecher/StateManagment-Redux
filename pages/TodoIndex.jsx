import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { DataTable } from "../cmps/data-table/DataTable.jsx";
import {
  showErrorMsg,
  showRemoveConfirmMsg,
  showSuccessMsg,
} from "../services/event-bus.service.js";
import { userService } from "../services/user.service.js";
import { stateTodoActions } from "../store/action/todo.actions.js";
import { stateUserActions } from "../store/action/user.actions.js";

const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useSelector, useDispatch } = ReactRedux;
const { useInfiniteQuery } = ReactQuery;

export function TodoIndex() {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todoModule.todos);

  const user = useSelector((state) => state.userModule.loggedInUser);

  const filterBy = useSelector((state) => state.todoModule.filterBy);

  // Special hook for accessing search-params:
  const [pageTodos, setPageTodos] = useState([]);
  const [currPage, setCurrPage] = useState(0);

  useEffect(() => {
    stateTodoActions.loadTodos(filterBy);
  }, [filterBy]);

  useEffect(() => {
    if (!todos || typeof todos === "string") return;
    const result = [];
    for (let i = 0; i < todos.length; i += 6) {
      result.push(todos.slice(i, i + 6));
    }
    setPageTodos(result);
  }, [todos]);

  useEffect(() => {
    if (user) {
      userService.setUserColors(user);
    }
  }, [user]);

  const onRemoveTodo = (todoId) => {
    showRemoveConfirmMsg("Are you sure you want to delete?", async () => {
      const removedTodo = await stateTodoActions.removeTodo(todoId);
      const updatedActivity = {
        title: "Removed a todo",
        description: removedTodo[0].txt,
        time: Date.now(),
      };
      user.fullname &&
        stateUserActions.updateUser({
          ...user,
          activities: [...user.activities, updatedActivity],
        });
    });
  };

  async function onToggleTodo(todo) {
    const savedTodo = await stateTodoActions.saveTodo(todo);
    await stateUserActions.updateUser({
      ...user,
      activities: [
        ...user.activities,
        {
          title: todo.isDone ? "Finished a todo" : "Returned a todo",
          description: savedTodo.txt,
          time: Date.now(),
        },
      ],
      balance: user.balance + 10,
    });

    return savedTodo;
  }

  function handleCurrPageChange(isReduce){
    if(isReduce && currPage === 0){
      showErrorMsg("You are already on the first page");
    }else if(!isReduce && currPage === pageTodos.length - 1){
      showErrorMsg("You are already on the last page");
    }else{
      setCurrPage((prev) => isReduce ? prev - 1 : prev + 1);
    }
  }

  if (typeof todos !== "string" && !pageTodos[0]) return <div>Loading...</div>;
  return (
    <section className="todo-index">
      <h2>Todos List</h2>
      <TodoFilter />
      <Link to="/todo/edit"><i class="bi bi-plus-lg icon-large"></i></Link>
      {typeof todos === "string" ? (
        <h3>{todos}</h3>
      ) : (
        <TodoList
          todos={pageTodos[currPage]}
          onRemoveTodo={onRemoveTodo}
          onToggleTodo={onToggleTodo}
        />
      )}
      <section className="pagination-buttons-container">
        <button onClick={() => handleCurrPageChange(true)}>
          Previous
        </button>
        <button onClick={() => handleCurrPageChange(false)}>Next</button>
      </section>
      <hr />
      {Array.isArray(todos) && (
        <section>
          <h2>Todos Table</h2>
          <div style={{ width: "60%", margin: "auto" }}>
            <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
          </div>
        </section>
      )}
    </section>
  );
}
