const { db } = require('../util/admin');

exports.getAllTodos = async (request, response) => {
	try {
		const todosSnapshots = await db.collection('todos').where('username', '==', request.user.username).get();

		let todos = [];

		todosSnapshots.forEach((doc) => {
			todos.push({
				todoId: doc.id,
				username: doc.data().username,
				title: doc.data().title,
				dueDate: doc.data().dueDate,
				completed: doc.data().completed
			});
		});
		return response.json(todos);
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: error.code });
	}
};

exports.addOneTodo = (request, response) => {
	const { title, dueDate, completed } = request.body;
	const { username } = request.user;
	db
		.collection('todos')
		.add({ username, title, dueDate, completed })
		.then((doc) => {
			const responseTodoItem = { username, title, dueDate, completed };
			responseTodoItem.id = doc.id;
			return response.json(responseTodoItem);
		})
		.catch((error) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
};

exports.editTodo = (request, response) => {
	let document = db.collection('todos').doc(`${request.params.todoId}`);

	document
		.update(request.body)
		.then(() => {
			response.json({ message: 'Updated successfully' });
		})
		.catch((err) => {
			console.error(err);
			return response.status(400).json({
				error: 'Something went wrong'
			});
		});
};
