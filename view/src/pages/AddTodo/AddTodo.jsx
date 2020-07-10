import React from 'react';
import { Link } from 'react-router-dom';

//components
import Layout from '../../components/Layout/Layout';
import Error from '../../components/Error/Error';

//helpers
import { validateAddTodoData } from '../../util/validators';

class AddTodo extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			dueDate: '',
			completed: '',
			validationErrors: '',
			fetchError: ''
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			validationErrors: '',
			fetchError: ''
		});

		const todoData = {
			title: this.state.title,
			dueDate: this.state.dueDate,
			completed: this.state.completed
		};

		const { valid, errors } = validateAddTodoData(todoData);
		if (valid) {
			//todo
		} else {
			this.setState({ validationErrors: errors });
		}
	}

	render() {
		return (
			<Layout>
				<div className='border-bottom w-50'>
					<p className='h2 my-4'>Add a new Todo</p>
				</div>
				<form
					onSubmit={(e) => {
						this.handleSubmit(e);
					}}>
					<div className='form-group my-4'>
						<input
							className='form-control w-50 my-3'
							name='title'
							placeholder='Add a new Todo'
							value={this.state.title}
							onChange={(e) => this.handleChange(e)}
						/>
						{this.state.validationErrors.title && <Error error={this.state.validationErrors.title} />}
						<input
							type='date'
							className='form-control w-25 my-3'
							name='dueDate'
							value={this.state.dueDate}
							onChange={(e) => this.handleChange(e)}
						/>
						{this.state.validationErrors.dueDate && <Error error={this.state.validationErrors.dueDate} />}
						<select
							value={this.state.completed}
							name='completed'
							className='form-control w-25 my-3'
							onChange={(e) => this.handleChange(e)}>
							<option value='' disabled>
								Status
							</option>
							<option value={true}>Complete</option>
							<option value={false}>Incomplete</option>
						</select>
						{this.state.validationErrors.completed && <Error error={this.state.validationErrors.completed} />}
						<div>
							<button type='submit' className='btn btn-outline-dark px-5 text-center'>
								Add Todo
							</button>
						</div>
					</div>
				</form>
				{this.state.fetchError.error && <Error error={this.state.fetchError.error} />}
			</Layout>
		);
	}
}

export default AddTodo;
