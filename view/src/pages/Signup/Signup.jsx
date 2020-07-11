import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

//style
import './Signup.css';

//components
import Error from '../../components/Error/Error';
import Logo from '../../assets/images/logo/logo.png';

//helpers
import { validateSignUpData } from '../../util/validators';

//actions
import { signUpUser, updateError } from '../../store/actions/user';

//selectors
import { getUserData, getFetchUserError } from '../../store/selectors.js';

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			website: '',
			phoneNumber: '',
			validationErrors: ''
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.user !== prevProps.user) {
			this.props.history.push('/todos');
		}
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const { signupUser, updateError } = this.props;
		//check if any error already stored in state and clear
		if (this.state.validationErrors) this.setState({ validationErrors: '' });
		if (this.props.fetchError) updateError('');

		const userData = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			passwordConfirmation: this.state.passwordConfirmation,
			website: this.state.website,
			phoneNumber: this.state.phoneNumber
		};

		const { valid, errors } = validateSignUpData(userData);

		if (!valid) this.setState({ validationErrors: errors });
		if (valid) signupUser(userData);
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
								{this.state.validationErrors.username && <Error error={this.state.validationErrors.username} />}
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
								{this.state.validationErrors.email && <Error error={this.state.validationErrors.email} />}
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
								{this.state.validationErrors.password && <Error error={this.state.validationErrors.password} />}
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
								{this.state.validationErrors.passwordConfirmation && (
									<Error error={this.state.validationErrors.passwordConfirmation} />
								)}
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
									name='phoneNumber'
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
						{this.props.fetchError.error && <Error error={this.props.fetchError.error} />}
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: getUserData(state),
		fetchError: getFetchUserError(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		signupUser: (userData) => {
			dispatch(signUpUser(userData));
		},
		updateError: (error) => {
			dispatch(updateError(error));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
