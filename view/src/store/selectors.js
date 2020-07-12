export const getVisibilityFilter = (store) => store.todos.visibilityFilter;

export const getFetchTodosError = (store) => store.todos.error.error;

export const getFetchUserError = (store) => store.user.error;

export const getUserData = (store) => store.user.data;

export const getUserToken = (store) => store.user.Authorization;

export const getUserLoading = (store) => store.user.loading;

export const getTodosLoading = (store) => store.todos.loading;

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

export function getCountedTodos(store) {
	const todos = store.todos.data;
	const totals = {
		totalNumberOfTodos: 0,
		completedTodos: 0,
		incompletedTodos: 0
	};
	todos.forEach((todo) => {
		totals.totalNumberOfTodos += 1;
		if (todo.completed) {
			totals.completedTodos += 1;
		} else {
			totals.incompletedTodos += 1;
		}
	});
	return totals;
}
