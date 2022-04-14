import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Tasks() {
	const response = { loading: false, data: [], message: '', error: false };
	const [severResponse, setSeverResponse] = useState(response);

	async function getTasks(credentials) {
		setSeverResponse({ ...severResponse, loading: true });
		return fetch('http://localhost:4002/api/tasks', {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
		.then(data => (data.json()))
		.then(tasks => setSeverResponse({ ...severResponse, loading: false, data: tasks.data }))
		.catch(error => setSeverResponse({ ...severResponse, loading: false, message: error && error.message, error: true }))
	}

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<div className="row justify-content-center">
			<div className="col-10">
				<div className='d-flex justify-content-between mt-5'>
					<h3>Tasks</h3>
					<Link to="/create-task">Create Task</Link>
				</div>
				<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>Task name</th>
							<th>Start date</th>
							<th>End date</th>
							<th>Priority</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{severResponse.data.map((task, index) => (
							<tr key={index}>
								<th>{index+1}</th>
								<td>{task.name}</td>
								<td>{task.startdate}</td>
								<td>{task.enddate}</td>
								<td>{task.priority}</td>
								<td>{task.description}</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className='text-center'>
					{severResponse.error ?
						<div className="alert alert-danger" role="alert">{severResponse.message}</div>
					:
					(severResponse.loading ?
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					:
					((severResponse.loading === false && severResponse.error === false && severResponse.data.length === 0) ?
						<div className="alert alert-info" role="alert">There are no Tasks available</div>
					:
						''
					)
					)
					}
				</div>
			</div>
		</div>
	);
}
