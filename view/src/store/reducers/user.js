const initialState = {
	data: '',
	loading: false,
	Authorization: '',
	error: ''
};

export function userReducer(state = initialState, action) {
	switch (action.type) {
		case 'START_LOADING':
			return {
				...state,
				loading: true
			};
		case 'UPDATE_USER_DATA':
			return {
				...state,
				data: action.payload,
				loading: false
			};
		case 'UPDATE_USER_TOKEN':
			return {
				...state,
				Authorization: action.payload,
				loading: false
			};
		case 'UPDATE_ERROR':
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
