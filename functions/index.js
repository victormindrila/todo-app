const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

const auth = require('./util/auth');
const { getAllTodos, addOneTodo, editTodo } = require('./APIs/todos');
const { signin, signup, getUserDetails } = require('./APIs/users');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

//todos
app.get('/todos', auth, getAllTodos);
app.post('/todos/add', auth, addOneTodo);
app.put('/todos/:todoId', auth, editTodo);

// users
app.post('/signin', signin);
app.post('/signup', signup);
app.get('/user', auth, getUserDetails);

exports.api = functions.https.onRequest(app);
