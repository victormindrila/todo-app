import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/images/logo/logo.png';
import './Signin.css';

//components
import Error from '../../components/Error/Error';

//helpers
import { validateSigninData } from '../../util/validators';

class Signin extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
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
		const userData = { username: this.state.username, password: this.state.password };

		const { valid, errors } = validateSigninData(userData);

		if (valid) {
			axios
				.post('/signin', this.state)
				.then((response) => {
					localStorage.setItem('Authorization', 'Bearer ' + response.data.token);
				})
				.catch((error) => {
					this.setState({ fetchError: error.response.data });
				});
		} else {
			this.setState({ validationErrors: errors });
		}
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
								name='username'
								placeholder='Username'
								value={this.state.username}
								onChange={(e) => this.handleChange(e)}
							/>
							{this.state.validationErrors.username && <Error error={this.state.validationErrors.username} />}
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
							{this.state.validationErrors.password && <Error error={this.state.validationErrors.password} />}
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
					{this.state.fetchError.error && <Error error={this.state.fetchError.error} />}
				</div>
			</div>
		);
	}
}

export default Signin;
