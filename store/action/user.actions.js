import { showSuccessMsg, showErrorMsg } from "../../services/event-bus.service.js";
import { userService } from "../../services/user.service.js";
import { SET_USER } from "../reducers/user.reducer.js";
import { store } from "../store.js";

export const stateUserActions = {
  login,
  signup,
  logout,
};

function login(credentials) {
  return userService
    .login(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user });
    })
    .then(() => showSuccessMsg("Logged in successfully"))
    .catch((err) => {
      showErrorMsg("Oops try again");
      console.log("user actions -> Cannot login", err);
      throw err;
    });
}

function signup(credentials) {
  return userService
    .signup(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user });
    })
    .then(() => showSuccessMsg("Signed up successfully"))
    .catch((err) => {
      console.log("user actions -> Cannot signup", err);
      showErrorMsg("Oops try again");
      throw err;
    });
}

function logout() {
  return userService
    .logout()
    .then(() => {
      store.dispatch({ type: SET_USER, user: null });
    })
    .catch((err) => {
      showErrorMsg("OOPs try again");
      console.log("user actions -> Cannot logout", err);
      throw err;
    });
}
