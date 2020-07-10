import React from 'react';

function TodosList() {
	const todos = [
		{
			title: 'Todo Task',
			completed: false,
			dueDate: 'Due on 23/05/2020'
		},
		{
			title: 'Todo Task',
			completed: false,
			dueDate: 'Due on 23/05/2020'
		},
		{
			title: 'Todo Task',
			completed: true,
			dueDate: 'Due on 23/05/2020'
		}
	];
	return (
		<div>
			{todos.map((todo) => {
				return (
					<div className='todo-wrapper d-flex align-items-center border-bottom mt-3'>
						<div className='w-25'>
							<p>{todo.title}</p>
						</div>

						<div className='w-50'>{todo.completed && <p className='badge badge-pill badge-primary'>completed</p>} </div>

						<div className='w-25'>
							<p>{todo.dueDate}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default TodosList;
