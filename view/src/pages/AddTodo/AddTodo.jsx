import React from 'react';
import { Link } from 'react-router-dom';

//components
import Layout from '../../components/Layout/Layout';

class AddTodo extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			dueDate: '',
			completed: ''
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state);
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
						<input
							type='date'
							className='form-control w-25 my-3'
							name='dueDate'
							value={this.state.dueDate}
							onChange={(e) => this.handleChange(e)}
						/>
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
						<button type='submit' className='btn btn-outline-dark px-5 text-center'>
							Add Todo
						</button>
					</div>
				</form>
			</Layout>
		);
	}
}

export default AddTodo;
