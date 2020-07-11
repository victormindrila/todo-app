import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutComponent({ data }) {
	return (
		<div>
			<Doughnut
				data={{
					labels: [ 'Completed', 'Incompleted' ],
					datasets: [
						{
							label: 'Todos',
							backgroundColor: [ '#0088ff', '#B21F00' ],
							hoverBackgroundColor: [ '#501800', '#4B5000' ],
							data: [ ...data ]
						}
					]
				}}
				options={{
					title: {
						display: true,
						text: 'Your Todos',
						fontSize: 20
					},
					legend: {
						display: true,
						position: 'right'
					}
				}}
			/>
		</div>
	);
}

export default DoughnutComponent;
