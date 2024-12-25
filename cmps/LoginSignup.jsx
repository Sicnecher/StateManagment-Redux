import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { userService } from "../services/user.service.js";
import { stateUserActions } from "../store/action/user.actions.js";

const { useState } = React;
const { useSelector, useDispatch } = ReactRedux;

export function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState(
    userService.getEmptyCredentials()
  );

  function handleChange({ target }) {
    const { name: field, value } = target;
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }));
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    onLogin(credentials);
  }

  function onLogin(credentials) {
    isSignup
      ? stateUserActions.signup(credentials)
      : stateUserActions.login(credentials);
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          placeholder="Username"
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        {isSignup && (
          <input
            type="text"
            name="fullname"
            value={credentials.fullname}
            placeholder="Full name"
            onChange={handleChange}
            required
          />
        )}
        <button>{isSignup ? "Signup" : "Login"}</button>
      </form>

      <div className="btns">
        <a href="#" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already a member? Login" : "New user? Signup here"}
        </a>
      </div>
    </div>
  );
}
