const functions = require('firebase-functions');
const app = require('express')();

const { getAllTodos, addOneTodo } = require('./APIs/todos');
const { signin, signup } = require('./APIs/users');

//todos
app.get('/todos', getAllTodos);
app.post('/todos/add', addOneTodo);

// users
app.post('/signin', signin);
app.post('/signup', signup);

exports.api = functions.https.onRequest(app);
