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
				body: doc.data().body,
				createdAt: doc.data().createdAt
			});
		});
		return response.json(todos);
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: error.code });
	}
};

exports.addOneTodo = (request, response) => {
	const { title, date, status } = request.body;
	const { username } = request.user;
	db
		.collection('todos')
		.add({ username, title, date, status })
		.then((doc) => {
			const responseTodoItem = { username, title, date, status };
			responseTodoItem.id = doc.id;
			return response.json(responseTodoItem);
		})
		.catch((error) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
};
