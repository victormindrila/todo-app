const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);

exports.signin = async (request, response) => {
	console.log('signin');
	try {
		const { username, password } = request.body;

		const userSnapshot = await db.doc(`/users/${username}`).get();

		if (!userSnapshot.exists) {
			return response.status(400).json({ error: "Username doesn't exist" });
		}

		const userData = await firebase.auth().signInWithEmailAndPassword(userSnapshot.data().email, password);

		const token = await userData.user.getIdToken();

		return response.json({ token });
	} catch (error) {
		console.error(error);
		return response.status(403).json({ error: 'Wrong credentials, please try again' });
	}
};

exports.signup = (request, response) => {
	const newUser = {
		username: request.body.username,
		email: request.body.email,
		password: request.body.password,
		confirmPassword: request.body.confirmPassword,
		website: request.body.website || null,
		phoneNumber: request.body.phoneNumber || null
	};

	let token, userId;

	db
		.doc(`/users/${newUser.username}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return response.status(400).json({ error: 'This username is already taken' });
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
				console.log(error.code);
				return response.status(400).json({ error: 'Email already in use' });
			} else {
				return response.status(500).json({ error: 'Something went wrong, please try again' });
			}
		});
};

exports.getUserDetails = async (request, response) => {
	try {
		let userData = {};
		const documentSnapshot = await db.doc(`/users/${request.user.username}`).get();

		if (documentSnapshot.exists) {
			userData = documentSnapshot.data();
			return response.json(userData);
		}
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: error.code });
	}
};
