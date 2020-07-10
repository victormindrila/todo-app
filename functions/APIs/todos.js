const { db } = require('../util/admin');

exports.getAllTodos = async (request, response) => {
	try {
		const todosSnapshots = await db.collection('todos').where('username', '==', request.user.username).get();

		let todos = [];

		todosSnapshots.forEach((doc) => {
			console.log(doc.data());
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
	console.log(request.body, username);
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
