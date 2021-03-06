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

export function updateUserToken(payload) {
	return {
		type: 'UPDATE_USER_TOKEN',
		payload
	};
}

export function updateError(payload) {
	return {
		type: 'UPDATE_ERROR',
		payload
	};
}

export function signinUser({ username, password, isPersistent }) {
	return (dispatch) => {
		dispatch(startLoading());

		const userData = {
			username,
			password
		};

		axios
			.post('https://us-central1-todo-app-2b9e9.cloudfunctions.net/api/signin', userData)
			.then((response) => {
				const payload = response.data;
				const token = 'Bearer ' + payload.token;
				dispatch(updateUserToken(token));
				if (isPersistent) {
					localStorage.setItem('Authorization', 'Bearer ' + payload.token);
				}
				dispatch(fetchUserData(token));
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
			.post('https://us-central1-todo-app-2b9e9.cloudfunctions.net/api/signup', userData)
			.then((response) => {
				const payload = response.data;
				const token = 'Bearer ' + payload.token;
				dispatch(updateUserToken(token));
				dispatch(fetchUserData(token));
			})
			.catch((error) => {
				if (!error.response) {
					dispatch(updateError({ error: 'no response from resource' }));
				} else {
					dispatch(updateError({ signup: error.response.data.error || error.response.data.message }));
				}
			});
	};
}

export function fetchUserData(token) {
	return (dispatch) => {
		dispatch(startLoading());
		const authToken = token || localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('https://us-central1-todo-app-2b9e9.cloudfunctions.net/api/user')
			.then((response) => {
				const payload = response.data;
				dispatch(updateUserData(payload));
			})
			.catch((error) => {
				if (!error.response) {
					dispatch(updateError({ error: 'no response from resource' }));
				} else {
					dispatch(updateError(error.response.data.error || error.response.data.message));
				}
			});
	};
}

export function logoutUser() {
	return (dispatch) => {
		localStorage.clear();
		dispatch(updateUserData(null));
		dispatch(updateUserToken(null));
	};
}
