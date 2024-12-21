import { todoService } from "../../services/todo.service.js";
import { ADD_TODO, REMOVE_TODO, SET_TODOS, SET_IS_LOADING, UNDO_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js";
import { store } from "../store.js";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";

export const stateTodoActions = {
    loadTodos,
    removeTodo,
    removeTodoOptimistic,
    saveTodo
}

function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos: todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        }).then(() => {
            showSuccessMsg('Todo removed')
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            showErrorMsg('Cannot remove todo')
            throw err
        })
}

function removeTodoOptimistic(todoId) {
    store.todoModule.dispatch({ type: REMOVE_TODO, todoId })
    return todoService.remove(todoId)
        .catch(err => {
            store.todoModule.dispatch({ type: UNDO_TODOS })
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then((savedTodo) => {
            store.todoModule.dispatch({ type, todo: savedTodo })
            showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'saved' : 'back on your list'}`)
            return savedTodo
        })
        .catch(err => {
            showErrorMsg('Cannot save todo')
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}