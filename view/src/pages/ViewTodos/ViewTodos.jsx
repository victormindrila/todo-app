import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import Layout from '../../components/Layout/Layout';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import TodosList from '../../components/TodosList/TodosList';

//actions
import { getAllTodos } from '../../store/actions/todos';
class ViewTodos extends React.Component {
	componentDidMount() {
		if (this.props.todos.length === 0) {
			this.props.getAllTodos();
		}
	}

	render() {
		return (
			<Layout>
				<Link to='/todos/add' className='add-todo d-flex align-items-center my-5 text-dark'>
					<Add />
					<span className='h2 ml-2'>Add a new Todo</span>
				</Link>
				<div className='buttons-group'>
					<button className='btn btn-outline-dark px-5'>My Todos</button>
					<button className='btn btn-outline-dark px-5'>My Incompleted ViewTodos</button>
					<button className='btn btn-outline-dark px-5'>My Completed Todos</button>
				</div>
				<TodosList todos={this.props.todos} />
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		todos: state.todos.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllTodos: () => {
			dispatch(getAllTodos());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTodos);
