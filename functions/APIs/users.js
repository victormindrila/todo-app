const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);

exports.signin = (request, response) => {
	const { email, password } = request.body;

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((token) => {
			return response.json({ token });
		})
		.catch((error) => {
			console.error(error);
			return response.status(403).json({ general: 'wrong credentials, please try again' });
		});
};

exports.signup = (request, response) => {
	const newUser = {
		username: request.body.username,
		email: request.body.email,
		password: request.body.password,
		confirmPassword: request.body.confirmPassword,
		website: request.body.website,
		phoneNumber: request.body.phoneNumber
	};

	let token, userId;

	db
		.doc(`/users/${newUser.username}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return response.status(400).json({ username: 'this username is already taken' });
			} else {
				return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
			}
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idtoken) => {
			token = idtoken;
			const userCredentials = {
				username: newUser.username,
				email: newUser.email,
				website: newUser.website,
				phoneNumber: newUser.phoneNumber,
				createdAt: new Date().toISOString(),
				userId
			};
			return db.doc(`/users/${newUser.username}`).set(userCredentials);
		})
		.then(() => {
			return response.status(201).json({ token });
		})
		.catch((error) => {
			console.error(error);
			if (error.code === 'auth/email-already-in-use') {
				return response.status(400).json({ email: 'Email already in use' });
			} else {
				return response.status(500).json({ general: 'Something went wrong, please try again' });
			}
		});
};
