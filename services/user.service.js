import { storageService } from "./async-storage.service.js";

export const userService = {
  getLoggedinUser,
  login,
  logout,
  signup,
  getById,
  update,
  query,
  getEmptyCredentials,
  setUserColors,
};
const STORAGE_KEY_LOGGEDIN = "user";
const STORAGE_KEY = "userDB";

function query() {
  return storageService.query(STORAGE_KEY);
}
async function getById(userId) {
  const response = await storageService.get(STORAGE_KEY, userId);
  return response;
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY).then((users) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) return _setLoggedinUser(user);
    else return Promise.reject("Invalid login");
  });
}

async function signup({ username, password, fullname }) {
  const user = {
    username,
    password,
    fullname,
    color: "#000000",
    bgColor: "#FFC0CB",
    balance: 1000,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    activities: [
      {
        title: "Account Created",
        description: "Welcome to your new account!",
        time: Date.now(),
      },
    ],
  };
  const userToSave = await storageService
    .post(STORAGE_KEY, user)
    .then(_setLoggedinUser);
  console.log("userToSave ", userToSave);
  return userToSave;
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
  return Promise.resolve();
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

async function update(user) {
  return await storageService.put(STORAGE_KEY, user).then(_setLoggedinUser);
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    username: user.usename,
    fullname: user.fullname,
    createdAt: user.createdAt,
    color: user.color,
    bgColor: user.bgColor,
    balance: user.balance,
    activities: user.activities,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave));
  return userToSave;
}

function getEmptyCredentials() {
  return {
    fullname: "",
    username: "muki",
    password: "muki1",
  };
}

function setUserColors({ bgColor, color }) {
  document.documentElement.style.setProperty("--clr1bg", bgColor);
  document.documentElement.style.setProperty("--clr1", color);
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }
