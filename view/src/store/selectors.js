export const getVisibilityFilter = (store) => store.todos.visibilityFilter;

export const getFetchTodosError = (store) => store.todos.error.error;

export const getFetchUserError = (store) => store.user.error;

export const getUserData = (store) => store.user.data;

export const getUserToken = (store) => store.user.Authorization;

export function getTodosByVisibilityFilter(store) {
	const todos = store.todos.data.slice() || [];
	const visibilityFilter = getVisibilityFilter(store);
	switch (visibilityFilter) {
		case 'SHOW_ALL':
			return todos;
		case 'COMPLETED':
			return todos.filter((todo) => todo.completed === true || todo.completed === 'true');
		case 'INCOMPLETE':
			return todos.filter((todo) => todo.completed === 'false' || todo.completed === false);
		default:
			return todos;
	}
}
