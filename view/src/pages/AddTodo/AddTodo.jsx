import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//style
import './AddTodo.css';

//components
import Layout from '../../components/Layout/Layout';
import Error from '../../components/Error/Error';

//helpers
import { validateAddTodoData } from '../../util/validators';
import { addTodo, updateErrorTodos } from '../../store/actions/todos';

//selectors
import { getFetchTodosError, getUserToken } from '../../store/selectors';

class AddTodo extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			dueDate: '',
			completed: '',
			validationErrors: ''
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSelectChange(e) {
		if (e.target.value === 'true') {
			this.setState({ [e.target.name]: true });
		} else if (e.target.value === 'false') {
			this.setState({ [e.target.name]: false });
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const { addTodo, updateErrorTodos, userToken } = this.props;
		//check if any error already stored in state and clear
		if (this.state.validationErrors) this.setState({ validationErrors: '' });
		if (this.props.fetchError) updateErrorTodos('');

		const todoData = {
			title: this.state.title,
			dueDate: this.state.dueDate,
			completed: this.state.completed
		};

		const { valid, errors } = validateAddTodoData(todoData);

		if (valid) {
			addTodo(todoData, userToken);
			this.props.history.push('/todos');
		}

		if (!valid) this.setState({ validationErrors: errors });
	}

	render() {
		return (
			<Layout>
				<div className='add-newtodo-wrapper border-bottom'>
					<p className='h2 my-4'>Add a new Todo</p>
				</div>
				<form
					onSubmit={(e) => {
						this.handleSubmit(e);
					}}>
					<div className='form-group my-4'>
						<div className='add-todo-input-wrapper'>
							<input
								className='form-control  input-sm my-3'
								name='title'
								placeholder='Add a new Todo'
								value={this.state.title}
								onChange={(e) => this.handleChange(e)}
							/>
						</div>
						{this.state.validationErrors.title && <Error error={this.state.validationErrors.title} />}
						<div className='date-input-wrapper'>
							<input
								type='date'
								className='form-control my-3'
								name='dueDate'
								value={this.state.dueDate}
								onChange={(e) => this.handleChange(e)}
							/>
						</div>
						{this.state.validationErrors.dueDate && <Error error={this.state.validationErrors.dueDate} />}
						<div className='status-input-wrapper'>
							<select
								value={this.state.completed}
								name='completed'
								className='form-control my-3'
								onChange={(e) => this.handleSelectChange(e)}>
								<option value='' disabled>
									Status
								</option>
								<option value={true}>Completed</option>
								<option value={false}>Incomplete</option>
							</select>
						</div>
						{this.state.validationErrors.completed && <Error error={this.state.validationErrors.completed} />}
						<div className='add-todo-button-wrapper'>
							<div>
								<button type='submit' className='btn btn-outline-dark px-5 text-center'>
									Add Todo
								</button>
							</div>
						</div>
					</div>
				</form>
				{this.props.fetchError && <Error error={this.props.fetchError} />}
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		fetchError: getFetchTodosError(state),
		userToken: getUserToken(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addTodo: (todoData, token) => {
			dispatch(addTodo(todoData, token));
		},
		updateErrorTodos: (error) => {
			dispatch(updateErrorTodos(error));
		}
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTodo));
