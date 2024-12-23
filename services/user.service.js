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
};
const STORAGE_KEY_LOGGEDIN = "user";
const STORAGE_KEY = "userDB";

function query() {
  return storageService.query(STORAGE_KEY);

}
function getById(userId) {
  return storageService.get(STORAGE_KEY, userId);
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

function signup({ username, password, fullname }) {
  const user = {
    username,
    password,
    fullname,
    color: "#000000",
    bgColor: "#000000",
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

  return storageService.post(STORAGE_KEY, user).then(_setLoggedinUser);
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
  return Promise.resolve();
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

async function update(user) {
  await storageService.put(STORAGE_KEY, user);
  return await storageService
    .put(STORAGE_KEY_LOGGEDIN, user)
    .then(_setLoggedinUser);
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    username: user.usename,
    fullname: user.fullname,
    createdAt: user.createdAt,
    color: user.color,
    bgColor: user.bgColor,
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
