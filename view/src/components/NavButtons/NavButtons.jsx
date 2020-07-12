import React from 'react';
import { Link } from 'react-router-dom';

function NavButtons() {
	return (
		<div className='btn-group-sm'>
			<Link to='/todos'>
				<button className={`btn px-5 btn-outline-dark`}>View Todos</button>
			</Link>
			<Link to='/todos/add'>
				<button className={`btn px-5 btn-outline-dark`}>Add New Todo</button>
			</Link>
		</div>
	);
}

export default NavButtons;
