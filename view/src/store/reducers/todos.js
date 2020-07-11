const initialState = {
	data: [],
	loading: false,
	error: ''
};

export function todosReducer(state = initialState, action) {
	switch (action.type) {
		case 'START_LOADING_TODOS':
			return {
				...state,
				loading: true
			};
		case 'UPDATE_TODOS_DATA':
			return {
				...state,
				data: [ ...action.payload ],
				loading: false
			};
		case 'UPDATE_ERROR_TODOS':
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
