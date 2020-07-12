import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//style
import './Home.css';

//components
import Layout from '../../components/Layout/Layout';
import Doughnut from '../../components/Doughnut/Doughnut';
import NavButtons from '../../components/NavButtons/NavButtons';
import { ReactComponent as Add } from '../../assets/icons/add.svg';

//actions
import { getAllTodos, updateErrorTodos } from '../../store/actions/todos';

//selectors
import { getTodosByVisibilityFilter, getFetchTodosError, getUserToken, getCountedTodos } from '../../store/selectors';

class Home extends React.Component {
	componentDidMount() {
		if (this.props.visibleTodos.length === 0) {
			this.props.updateErrorTodos('');
			this.props.getAllTodos(this.props.userToken);
		}
	}

	render() {
		const { countedTodos, visibleTodos } = this.props;
		const chartData = [ countedTodos.completedTodos, countedTodos.incompletedTodos ];

		if (visibleTodos.length === 0) {
			return (
				<Layout>
					<div className='d-flex flex-column align-items-center h-100'>
						<p className='h2'>No Todos to display</p>
						<Link to='/todos/add' className='add-todo d-flex align-items-center my-5 text-dark'>
							<Add />
							<span className='h2 ml-2'>Add a new Todo</span>
						</Link>
					</div>
				</Layout>
			);
		} else {
			return (
				<Layout>
					<div className='dashboard-wrapper border-bottom d-flex justify-content-between align-items-center'>
						<h1 className='h2 my-4'>DASHBOARD</h1>
						<NavButtons />
					</div>
					<div className='aggregates-wrapper border-bottom'>
						<p className='h4 my-4'>Total todos: {countedTodos.totalNumberOfTodos} </p>
						<p className='h4 my-4'>Completed todos: {countedTodos.completedTodos} </p>
						<p className='h4 my-4'>Incompleted todos: {countedTodos.incompletedTodos} </p>
					</div>
					<Doughnut data={chartData} />
				</Layout>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		visibleTodos: getTodosByVisibilityFilter(state),
		fetchError: getFetchTodosError(state),
		userToken: getUserToken(state),
		countedTodos: getCountedTodos(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllTodos: (token) => {
			dispatch(getAllTodos(token));
		},
		updateErrorTodos: (error) => {
			dispatch(updateErrorTodos(error));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
