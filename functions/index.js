const functions = require('firebase-functions');
const app = require('express')();

const { getAllTodos, addOneTodo } = require('./APIs/todos');

app.get('/todos', getAllTodos);
app.post('/todos/add', addOneTodo);

exports.api = functions.https.onRequest(app);
