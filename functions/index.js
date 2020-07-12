const functions = require('firebase-functions');
const app = require('express')();

const auth = require('./util/auth');
const { getAllTodos, addOneTodo, editTodo } = require('./APIs/todos');
const { signin, signup, getUserDetails } = require('./APIs/users');

//todos
app.get('/todos', auth, getAllTodos);
app.post('/todos/add', auth, addOneTodo);
app.put('/todos/:todoId', auth, editTodo);

// users
app.post('/signin', signin);
app.post('/signup', signup);
app.get('/user', auth, getUserDetails);

exports.api = functions.https.onRequest(app);
