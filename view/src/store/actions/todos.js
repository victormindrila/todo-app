import axios from 'axios';

export function startLoadingTodos() {
	return {
		type: 'START_LOADING_TODOS'
	};
}

export function updateTodosData(payload) {
	return {
		type: 'UPDATE_TODOS_DATA',
		payload
	};
}

export function updateErrorTodos(payload) {
	return {
		type: 'UPDATE_ERROR_TODOS',
		payload
	};
}

export function setVisibilityFilter(filter) {
	return {
		type: 'SET_VISIBILITY_FILTER',
		filter: filter
	};
}

export function clearTodos() {
	return {
		type: 'CLEAR_TODOS_DATA'
	};
}

export function getAllTodos(token) {
	return (dispatch) => {
		dispatch(startLoadingTodos());
		const authToken = token || localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('https://us-central1-todo-app-2b9e9.cloudfunctions.net/api/todos')
			.then((response) => {
				const payload = response.data;
				dispatch(updateTodosData(payload));
			})
			.catch((error) => {
				if (!error.response) {
					dispatch(updateErrorTodos({ error: 'no response from resource' }));
				} else {
					dispatch(updateErrorTodos(error.response.data));
				}
			});
	};
}

export function addTodo(todoData, token) {
	return (dispatch) => {
		dispatch(startLoadingTodos());
		const authToken = token || localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post('https://us-central1-todo-app-2b9e9.cloudfunctions.net/api/todos/add', todoData)
			.then(() => {
				//refresh all todos after todo has been added to db
				dispatch(getAllTodos(authToken));
			})
			.catch((error) => {
				if (!error.response) {
					dispatch(updateErrorTodos({ error: 'no response from resource' }));
				} else {
					dispatch(updateErrorTodos(error.response.data));
				}
			});
	};
}
