import React from 'react';
import './TodoList.css';

function TodosList({ todos, handleMarkCompleted }) {
	return (
		<div>
			{todos.map((todo) => {
				return (
					<div className='todo d-flex align-items-center flex-wrap' key={todo.todoId}>
						<div className='border-bottom mt-3' id='todo-wrapper'>
							<div className='title'>
								<p>
									{todo.title}
									{todo.completed && <span className='badge badge-secondary text-dark ml-4'>completed</span>}
								</p>
							</div>

							<div className='date'>
								<p>Due on {new Date(todo.dueDate).toLocaleDateString('en-GB')}</p>
							</div>
						</div>
						{!todo.completed ? (
							<button
								type='button'
								className='ml-3 btn btn-outline-secondary btn-sm'
								onClick={() => handleMarkCompleted(todo.todoId, { completed: true })}>
								Mark completed
							</button>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default TodosList;
