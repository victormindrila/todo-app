import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import Layout from '../../components/Layout/Layout';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import TodosList from '../../components/TodosList/TodosList';
import Error from '../../components/Error/Error';

//actions
import { getAllTodos, setVisibilityFilter, updateErrorTodos } from '../../store/actions/todos';

//selectors
import { getTodosByVisibilityFilter, getFetchTodosError, getUserToken } from '../../store/selectors';

class ViewTodos extends React.Component {
	componentDidMount() {
		if (this.props.visibleTodos.length === 0) {
			this.props.updateErrorTodos('');
			this.props.getAllTodos(this.props.userToken);
		}
	}

	render() {
		const { setVisibilityFilter } = this.props;
		return (
			<Layout>
				<Link to='/todos/add' className='add-todo d-flex align-items-center my-5 text-dark'>
					<Add />
					<span className='h2 ml-2'>Add a new Todo</span>
				</Link>
				<div className='buttons-group'>
					<button className='btn btn-outline-dark px-5' onClick={() => setVisibilityFilter('SHOW_ALL')}>
						My Todos
					</button>
					<button className='btn btn-outline-dark px-5' onClick={() => setVisibilityFilter('INCOMPLETE')}>
						My Incompleted Todos
					</button>
					<button className='btn btn-outline-dark px-5' onClick={() => setVisibilityFilter('COMPLETED')}>
						My Completed Todos
					</button>
				</div>
				<TodosList todos={this.props.visibleTodos} />
				{this.props.fetchError && <Error error={this.props.fetchError} />}
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		visibleTodos: getTodosByVisibilityFilter(state),
		fetchError: getFetchTodosError(state),
		userToken: getUserToken(state)
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
