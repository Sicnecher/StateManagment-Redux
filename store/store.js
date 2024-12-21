import { todoReducer } from './reducers/todo.reducer.js';
import { userReducer } from './reducers/user.reducer.js';

const { createStore, combineReducers, applyMiddleware, compose } = Redux;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    todoModule: todoReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer, composeEnhancers())
console.log(store)
window.gStore = store