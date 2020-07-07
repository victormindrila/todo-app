const { db } = require('../util/admin');

exports.getAllTodos = async (request, response) => {
	try {
		const todosSnapshots = await db.collection('todos').orderBy('createdAt', 'desc').get();

		let todos = [];

		todosSnapshots.forEach((doc) => {
			todos.push({
				todoId: doc.id,
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
	db
		.collection('todos')
		.add({ title, date, status })
		.then((doc) => {
			const responseTodoItem = { title, date, status };
			responseTodoItem.id = doc.id;
			return response.json(responseTodoItem);
		})
		.catch((error) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
};
