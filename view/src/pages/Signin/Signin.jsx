import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo/logo.png';
import './Signin.css';

class Signin extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
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
			<div className='signin-page flex-column d-flex justify-content-center align-items-center'>
				<div className='login-form d-flex flex-column shadow px-5 py-4 pb-5'>
					<Link to='/' className='align-self-center'>
						<img src={Logo} alt='logo' className='logo mb-4' />
					</Link>
					<form
						className='d-flex flex-column'
						onSubmit={(e) => {
							this.handleSubmit(e);
						}}>
						<div className='form-group mb-3'>
							<input
								className='form-control'
								name='email'
								placeholder='Username'
								value={this.state.Username}
								onChange={(e) => this.handleChange(e)}
							/>
						</div>
						<div className='form-group my-2'>
							<input
								type='password'
								className='form-control'
								name='password'
								placeholder='Password'
								value={this.state.password}
								onChange={(e) => this.handleChange(e)}
							/>
						</div>

						<div className='form-check my-2 mt-3'>
							<input type='checkbox' className='form-check-input' id='remember-me' />
							<label className='form-check-label' htmlFor='remember-me'>
								Remember me
							</label>
						</div>

						<Link to='/' className='align-self-center my-2'>
							<p>Login using social account</p>
						</Link>

						<div className='d-flex justify-content-between'>
							<button className='btn btn-outline-dark'>Register</button>
							<button type='submit' className='btn btn-outline-dark'>
								Log In
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Signin;
