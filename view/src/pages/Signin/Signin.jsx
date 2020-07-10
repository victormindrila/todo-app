import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//style
import './Signin.css';

//components
import Error from '../../components/Error/Error';
import Logo from '../../assets/images/logo/logo.png';

//helpers
import { validateSigninData } from '../../util/validators';

//actions
import { signinUser, updateError } from '../../store/actions/user';

class Signin extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
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
		const { signinUser, updateError } = this.props;
		//check if any error already stored in state and clear
		if (this.state.validationErrors) this.setState({ validationErrors: '' });
		if (this.props.fetchError) updateError('');

		const userData = { username: this.state.username, password: this.state.password };

		const { valid, errors } = validateSigninData(userData);

		if (!valid) this.setState({ validationErrors: errors });
		if (valid) signinUser(userData);
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
					{this.props.fetchError.error && <Error error={this.props.fetchError.error} />}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.data,
		fetchError: state.user.error
	};
}

function mapDispatchToProps(dispatch) {
	return {
		signinUser: (username, password) => {
			dispatch(signinUser(username, password));
		},
		updateError: (error) => {
			dispatch(updateError(error));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
