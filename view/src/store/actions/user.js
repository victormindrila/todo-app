import axios from 'axios';

export function startLoading() {
	return {
		type: 'START_LOADING'
	};
}

export function updateUserData(payload) {
	return {
		type: 'UPDATE_USER_DATA',
		payload
	};
}

export function updateError(payload) {
	return {
		type: 'UPDATE_ERROR',
		payload
	};
}

export function signinUser({ username, password }) {
	return (dispatch) => {
		dispatch(startLoading());

		const userData = {
			username,
			password
		};

		axios
			.post('/signin', userData)
			.then((response) => {
				const payload = response.data;
				localStorage.setItem('Authorization', 'Bearer ' + payload.token);
				dispatch(fetchUserData());
			})
			.catch((error) => {
				if (!error.response) {
					dispatch(updateError({ error: 'no response from resource' }));
				} else {
					dispatch(updateError(error.response.data));
				}
			});
	};
}

export function signUpUser(userData) {
	return (dispatch) => {
		dispatch(startLoading());

		axios
			.post('/signup', userData)
			.then((response) => {
				const payload = response.data;
				localStorage.setItem('Authorization', 'Bearer ' + payload.token);
				dispatch(fetchUserData());
			})
			.catch((error) => {
				dispatch(updateError(error));
			});
	};
}

export function fetchUserData() {
	return (dispatch) => {
		dispatch(startLoading());
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/user')
			.then((response) => {
				const payload = response.data;
				dispatch(updateUserData(payload));
			})
			.catch((error) => {
				dispatch(updateError(error.response.data));
			});
	};
}
