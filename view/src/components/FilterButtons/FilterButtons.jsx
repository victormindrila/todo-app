import React from 'react';

function FilterButtons({ setVisibilityFilter, currentFilter }) {
	return (
		<div className='btn-group'>
			<button
				className={`btn px-5 ${currentFilter === 'SHOW_ALL' ? 'btn-primary' : 'btn-outline-dark'}`}
				onClick={() => setVisibilityFilter('SHOW_ALL')}>
				My Todos
			</button>
			<button
				className={`btn px-5 ${currentFilter === 'INCOMPLETE' ? 'btn-primary' : 'btn-outline-dark'}`}
				onClick={() => setVisibilityFilter('INCOMPLETE')}>
				My Incompleted Todos
			</button>
			<button
				className={`btn px-5 ${currentFilter === 'COMPLETED' ? 'btn-primary' : 'btn-outline-dark'}`}
				onClick={() => setVisibilityFilter('COMPLETED')}>
				My Completed Todos
			</button>
		</div>
	);
}

export default FilterButtons;
