import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo/logo.png';
import './Signup.css';

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			website: '',
			phone: ''
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		//todo
	}

	render() {
		return (
			<div className='signup-page flex-column d-flex justify-content-center align-items-center'>
				<div className='signup-form d-flex flex-column shadow px-5 py-4 pb-5'>
					<Link to='/' className='align-self-center'>
						<img src={Logo} alt='logo' className='logo mb-4' />
					</Link>
					<form
						className='d-flex flex-column'
						onSubmit={(e) => {
							this.handleSubmit(e);
						}}>
						<div className='form-group row mb-5'>
							<div className='col-sm-6 my-2'>
								<input
									className='form-control'
									name='username'
									placeholder='Username'
									value={this.state.username}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							<div className='col-sm-6 my-2'>
								<input
									type='text'
									className='form-control'
									name='email'
									placeholder='Email'
									value={this.state.email}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							<div className='col-sm-6 my-2'>
								<input
									type='password'
									className='form-control'
									name='password'
									placeholder='Password'
									value={this.state.password}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							<div className='col-sm-6 my-2'>
								<input
									type='password'
									className='form-control'
									name='passwordConfirmation'
									placeholder='Re-type Password'
									value={this.state.passwordConfirmation}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							<div className='col-sm-6 my-2'>
								<input
									type='text'
									className='form-control'
									name='website'
									placeholder='Website'
									value={this.state.website}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							<div className='col-sm-6 my-2'>
								<input
									type='text'
									className='form-control'
									name='phone'
									placeholder='Phone'
									value={this.state.phone}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-sm-6 my-2'>
								<button className='btn btn-outline-dark px-5'> &lt; Back</button>
							</div>
							<div className='col-sm-6 my-2'>
								<button type='submit' className='btn btn-outline-dark form-control'>
									Create account
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Signup;
