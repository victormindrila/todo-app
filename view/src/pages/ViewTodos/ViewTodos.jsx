import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

//components
import Layout from '../../components/Layout/Layout';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import TodosList from '../../components/TodosList/TodosList';
import Error from '../../components/Error/Error';
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import Spinner from '../../components/Spinner/Spinner';

//actions
import { getAllTodos, setVisibilityFilter, updateErrorTodos } from '../../store/actions/todos';

//selectors
import {
	getTodosByVisibilityFilter,
	getFetchTodosError,
	getUserToken,
	getVisibilityFilter,
	getTodosLoading
} from '../../store/selectors';

class ViewTodos extends React.Component {
	constructor() {
		super();
		this.handleMarkCompleted = this.handleMarkCompleted.bind(this);
	}
	componentDidMount() {
		if (this.props.visibleTodos.length === 0) {
			this.props.updateErrorTodos('');
			this.props.getAllTodos(this.props.userToken);
		}
	}

	handleMarkCompleted(todoId, data) {
		const authToken = this.props.userToken || localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.put(`https://us-central1-todo-app-2b9e9.cloudfunctions.net/api/todos/${todoId}`, data)
			.then((response) => {
				this.props.getAllTodos(authToken);
			})
			.catch((error) => {
				console.dir(error);
			});
	}

	render() {
		const { setVisibilityFilter, currentFilter, todosLoading } = this.props;
		return (
			<Layout>
				<Link to='/todos/add' className='add-todo d-flex align-items-center my-5 text-dark'>
					<Add />
					<span className='h2 ml-2'>Add a new Todo</span>
				</Link>
				<FilterButtons setVisibilityFilter={setVisibilityFilter} currentFilter={currentFilter} />
				{todosLoading ? (
					<Spinner />
				) : (
					<TodosList todos={this.props.visibleTodos} handleMarkCompleted={this.handleMarkCompleted} />
				)}
				{this.props.fetchError && <Error error={this.props.fetchError} />}
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		visibleTodos: getTodosByVisibilityFilter(state),
		fetchError: getFetchTodosError(state),
		userToken: getUserToken(state),
		currentFilter: getVisibilityFilter(state),
		todosLoading: getTodosLoading(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllTodos: (token) => {
			dispatch(getAllTodos(token));
		},
		setVisibilityFilter: (filter) => {
			dispatch(setVisibilityFilter(filter));
		},
		updateErrorTodos: (error) => {
			dispatch(updateErrorTodos(error));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTodos);
