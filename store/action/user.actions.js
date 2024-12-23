import {
  showSuccessMsg,
  showErrorMsg,
} from "../../services/event-bus.service.js";
import { userService } from "../../services/user.service.js";
import { SET_USER } from "../reducers/user.reducer.js";
import { store } from "../store.js";

export const stateUserActions = {
  login,
  signup,
  logout,
  updateUser
};

async function login(credentials) {
  return await userService
    .login(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user });
    })
    .then(() => showSuccessMsg("Logged in successfully"))
    .catch((err) => {
      showErrorMsg(err);
      console.log("user actions -> Cannot login", err);
      throw err;
    });
}

async function signup(credentials) {
  return await userService
    .signup(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user });
    })
    .then(() => showSuccessMsg("Signed up successfully"))
    .catch((err) => {
      console.log("user actions -> Cannot logout", err);
      showErrorMsg("OOPs try again");
      throw err;
    });
}

async function logout() {
  return await userService
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

async function updateUser(user) {
  return await userService
    .update(user)
    .then(() => {
      store.dispatch({ type: SET_USER, user });
    })
    .catch((err) => {
      showErrorMsg("OOPs try again");
      console.log("user actions -> Cannot logout", err);
      throw err;
    });
}
