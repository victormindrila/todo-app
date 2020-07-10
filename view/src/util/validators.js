const isEmpty = (input) => {
	if (input === '') return true;
	if (input === 0) return true;
	else return false;
};

const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
};

exports.validateSigninData = (data) => {
	let errors = {};

	if (isEmpty(data.username)) errors.username = 'Must not be empty';
	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateSignUpData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be valid email address';
	}

	if (isEmpty(data.username)) errors.username = 'Must not be empty';
	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (isEmpty(data.passwordConfirmation)) errors.passwordConfirmation = 'Must not be empty';
	if (data.password !== data.passwordConfirmation) errors.passwordConfirmation = 'Passwords must be the same';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};
