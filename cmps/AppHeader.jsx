const { Link, NavLink } = ReactRouterDOM;
const { useNavigate } = ReactRouter;
const { useEffect, useState } = React;

import { userService } from "../services/user.service.js";
import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from "./LoginSignup.jsx";
import { showErrorMsg } from "../services/event-bus.service.js";
import { stateUserActions } from "../store/action/user.actions.js";
import { todoService } from "../services/todo.service.js";

const { useSelector } = ReactRedux;

export function AppHeader() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userModule.loggedInUser);
  const [donePrec, setDonePrec] = useState(null);

  useEffect(() => {
    async function setProgressBar(){
      const allTodos = await todoService.query();
      const doneTodos = allTodos.filter((todo) => todo.isDone);
      let calc = doneTodos.length / allTodos.length;
      calc = calc === Infinity ? 0 : JSON.stringify(calc * 100);
      console.log(calc, typeof calc, allTodos.length, doneTodos.length);
      setDonePrec(
        `${calc === 0 ? calc : calc[0] + calc[1] + calc[2] + calc[3]}%`
      );
    }
    setProgressBar();
  }, []);
  return (
    <div>
      <header className="app-header full main-layout">
        <section className="header-container">
          <h1>React Todo App</h1>
          {user ? (
            <section>
              <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
              <button onClick={stateUserActions.logout}>Logout</button>
            </section>
          ) : (
            <section>
              <LoginSignup />
            </section>
          )}
          <nav className="app-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/todo">Todos</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </nav>
        </section>
        <UserMsg />
      </header>
      {donePrec && donePrec != "NaN%" && (
        <section className="progress-bar">
          <h3>Progress Bar:</h3>
          <h4>{donePrec}</h4>
        </section>
      )}
    </div>
  );
}
