import React from 'react';
import { Link } from 'react-router-dom';

//components
import Layout from '../../components/Layout/Layout';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import TodosList from '../../components/TodosList/TodosList';

function ViewTodos() {
	return (
		<Layout>
			<Link to='/todos/add' className='add-todo d-flex align-items-center my-5 text-dark'>
				<Add />
				<span className='h2 ml-2'>Add a new Todo</span>
			</Link>
			<div className='buttons-group'>
				<button className='btn btn-outline-dark px-5'>My Todos</button>
				<button className='btn btn-outline-dark px-5'>My Incompleted ViewTodos</button>
				<button className='btn btn-outline-dark px-5'>My Completed Todos</button>
			</div>
			<TodosList />
		</Layout>
	);
}

export default ViewTodos;
