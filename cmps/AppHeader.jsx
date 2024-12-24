const { Link, NavLink } = ReactRouterDOM;
const { useNavigate } = ReactRouter;
const { useEffect, useState } = React;

import { userService } from "../services/user.service.js";
import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from "./LoginSignup.jsx";
import { showErrorMsg } from "../services/event-bus.service.js";
import { stateUserActions } from "../store/action/user.actions.js";
import { todoService } from "../services/todo.service.js";
import { SET_DONE_PREC } from "../store/reducers/todo.reducer.js";
import { stateTodoActions } from "../store/action/todo.actions.js";

const { useSelector, useDispatch } = ReactRedux;

export function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userModule.loggedInUser);
  const donePerc = useSelector((state) => state.todoModule.donePerc);

  useEffect(() => {
    stateTodoActions.setDonePrecents();
  }, []);

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div>
      <header className="app-header full main-layout">
        <section className="header-container">
          <h1>React Todo App</h1>
          {user ? (
            <section>
              <Link to={`/user/${user._id}`}>Hello {user.fullname} your balance is {user.balance}</Link>
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
      {donePerc && donePerc != "NaN%" && (
        <section className="progress-bar">
          <h3>Progress Bar:</h3>
          <h4>{donePerc}</h4>
        </section>
      )}
    </div>
  );
}
