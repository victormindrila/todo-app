import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

//pages
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import ViewTodos from './pages/ViewTodos/ViewTodos';
import AddTodo from './pages/AddTodo/AddTodo';
import Page404 from './pages/Page404/Page404';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/signin' component={Signin} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/todos' component={ViewTodos} />
				<Route exact path='/todos/add' component={AddTodo} />
				<Route path='*' component={Page404} />
			</Switch>
		</div>
	);
}

export default App;
