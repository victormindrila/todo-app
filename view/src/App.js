import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

//pages
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import ViewTodos from './pages/ViewTodos/ViewTodos';
import AddTodo from './pages/AddTodo/AddTodo';
import Page404 from './pages/Page404/Page404';

//actions
import { fetchUserData } from './store/actions/user';

//selectors
import { getUserData, getUserToken } from './store/selectors';

class App extends React.Component {
	componentDidMount() {
		const { user, userToken, fetchUserData } = this.props;
		if (!user) {
			fetchUserData(userToken);
		}
	}

	render() {
		const isLoggedIn = this.props.user ? true : false;
		return (
			<div className='App'>
				<Switch>
					<Route exact path='/signin' component={Signin} />
					<Route exact path='/signup' component={Signup} />

					<Route exact path={'/'}>
						{!isLoggedIn ? <Redirect to='/signin' /> : <Home />}
					</Route>

					<Route exact path={'/todos'}>
						{!isLoggedIn ? <Redirect to='/signin' /> : <ViewTodos />}
					</Route>

					<Route exact path={'/todos/add'}>
						{!isLoggedIn ? <Redirect to='/signin' /> : <AddTodo />}
					</Route>

					<Route exact path={'/*'}>
						{!isLoggedIn ? <Redirect to='/signin' /> : <Page404 />}
					</Route>
				</Switch>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: getUserData(state),
		userToken: getUserToken(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUserData: () => {
			dispatch(fetchUserData());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
