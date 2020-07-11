import React from 'react';

function TodosList({ todos }) {
	return (
		<div>
			{todos.map((todo) => {
				return (
					<div className='todo-wrapper d-flex align-items-center border-bottom mt-3' key={todo.todoId}>
						<div className='w-25'>
							<p>{todo.title}</p>
						</div>

						<div className='w-50'>{todo.completed && <p className='badge badge-pill badge-primary'>completed</p>}</div>

						<div className='w-25'>
							<p>Due on {todo.dueDate}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default TodosList;
