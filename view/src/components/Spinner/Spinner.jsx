import React from 'react';
import './Spinner.css';

function Spinner() {
	return (
		<div className='spinner-container d-flex justify-content-center align-items-center'>
			<div className='spinner-border' role='status'>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	);
}

export default Spinner;
