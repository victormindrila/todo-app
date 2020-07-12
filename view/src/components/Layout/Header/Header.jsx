import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//style
import './Header.css';

//components
import { ReactComponent as UserLogo } from '../../../assets/icons/user.svg';
import Dropdown from '../../../components/Dropdown/Dropdown';
import Logo from '../../../assets/images/logo/logo.png';

//actions
import { logoutUser } from '../../../store/actions/user';
import { clearTodos } from '../../../store/actions/todos';

//selectors
import { getUserData } from '../../../store/selectors.js';

function Header({ user, logoutUser, clearTodos }) {
	const [ showDropDown, setShowDropDown ] = useState(false);
	return (
		<header className='border-bottom mb-3 '>
			<div className='nav-bar container-fluid d-flex align-items-center'>
				<Link to='/' className='my-3 logo-link'>
					<img src={Logo} alt={`Todo App logo`} className='logo' />
				</Link>
				<div className=' pl-3 w-100 d-flex align-items-center justify-content-between'>
					<h1 className='h3 app-title'>My Cool App</h1>
					<div className=' user-dropdown dropdown d-flex align-items-center' onClick={() => setShowDropDown(true)}>
						<UserLogo />
						<span className='h4 ml-1 mt-2 username'>Welcome {user.username}</span>
						<div className=' dropdown-toggle h4 ml-2 pt-2' />
						<Dropdown
							show={showDropDown}
							setShowDropDown={setShowDropDown}
							logoutUser={logoutUser}
							clearTodos={clearTodos}
						/>
					</div>
				</div>
			</div>
		</header>
	);
}

function mapStateToProps(state) {
	return {
		user: getUserData(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logoutUser: () => {
			dispatch(logoutUser());
		},
		clearTodos: () => {
			dispatch(clearTodos());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
