import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

export default function CreateTask() {
	const navigate = useNavigate();
	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

	const [name, setName] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [employeeId, setEmployeeId] = useState([]);
	const [projectId, setProjectId] = useState([]);
	const [description, setDescription] = useState('');
	const [priority, setpriority] = useState('');
	const [taskDocs, setTaskDocs] = useState('');
	const [descriptionCheck, setDescriptionCheck] = useState('');

	const [projecs, setProjecs] = useState([]);
	const [employees, setEmployees] = useState([]);

	const response = { loading: false, data: {}, message: '', error: false };
	const [severResponse, setSeverResponse] = useState(response);


	// Handling the name change
	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleStartDate = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDate = (e) => {
		setEndDate(e.target.value);
	};

	const handleDescription = (e) => {
		const newText = e.target.value;
		if (newText.length === 30) {
			setDescriptionCheck('border-2 border-success');
			setDescription(newText);
		} else if (newText.length > 30) {
			setDescriptionCheck('border-2 border-danger');
			setDescription(newText);
		} else {
			setDescriptionCheck('border-2 border-default');
			setDescription(newText);
		}
	};

	const handlePriority = (e) => {
		setpriority(e.target.value);
	};

	const handleTaskDocs = (e) => {
		setTaskDocs(e.target.value);
	};

	const handleReset = (e) => {
		e.preventDefault();
		setName('');
		setStartDate('');
		setEndDate('');
		setEmployeeId([]);
		setProjectId([]);
		setDescription('');
		setpriority('');
		setTaskDocs('');
		setDescriptionCheck('');
		setSeverResponse(response);
	}

	// Handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (name === '' || startDate === '' || endDate === '' || description === '' || description.length > 30 || projectId.length === 0) {
			setSeverResponse({ ...severResponse, loading: false, error: true, message: 'Please, fill all those fields. [name, startDate, endDate, projects, description (30 character)]' })
		} else {
			const projectIds = projectId.map(project => project.value );
			const employeeIds = employeeId.map(employee => employee.value);

			createTask({
				name,
				startDate,
				endDate,
				projectId: projectIds,
				employeeId: employeeIds,
				description,
				priority
			});
		}
	};

	async function createTask(task) {
		setSeverResponse({ ...severResponse, loading: true });
		return await fetch('http://localhost:4002/api/tasks', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(task)
		})
		.then(jsonData => (jsonData.json()))
		.then(res => {
			if (res.data) setSeverResponse({ ...severResponse, loading: false, message: res.data.message })
			if (res.error) setSeverResponse({ ...severResponse, loading: false, message: res.error, error: true, })
		});
	}

	async function getProjects(credentials) {
		return fetch('http://localhost:4002/api/projects', {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
		.then(jsonData => (jsonData.json()))
		.then(res => {
			setProjecs(res.data)
			if (res.error) console.log('projects error => ', res.error)
		}).catch();
	}

	async function getEmployees(credentials) {
		return fetch('http://localhost:4002/api/employees', {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
		.then(jsonData => (jsonData.json()))
		.then(res => {
			setEmployees(res.data);
			if (res.error) console.log('projects error => ', res.error)
		}).catch();
	}

	const selectOptions = (arrayData) => {
		return arrayData.map(element => {
			return { value: element.id, label: element.name };
		});
	}

	useEffect(() => {
		getProjects();
		getEmployees();
		if (!loggedInUser) navigate('/');
	}, [loggedInUser, navigate]);
	return (
		<div className="row justify-content-center">
			<div className="col-5">
				
				<div className='d-flex justify-content-between mt-5'>
					<h3>Create Task</h3>
					<Link to="/tasks">View Tasks</Link>
				</div>
				<form onSubmit={handleSubmit}>
					{severResponse.message && severResponse.error && <div className="alert alert-danger" role="alert">{severResponse.message}</div>}

					{severResponse.message && !severResponse.error && <div className="alert alert-success" role="alert">{severResponse.message}</div>}
					
					{/* <!-- name input --> */}
					<div className="form-outline mb-2">
						<label className="form-label" htmlFor="form2Example1">Name</label>
						<input type="name" id="form2Example1" placeholder="Task name" className="form-control" value={name} onChange={handleName} required />
					</div>

					<div className="row g-3">
						<div className="col">
							<label className="form-label" htmlFor="form2Example1">Start date</label>
							<input type="date" className="form-control" aria-label="startDate" value={startDate} onChange={handleStartDate} required />
						</div>
						<div className="col">
							<label className="form-label" htmlFor="form2Example1">End date</label>
							<input type="date" className="form-control" aria-label="endDate" value={endDate} onChange={handleEndDate} required />
						</div>
					</div>

					<div className="row g-3">
						<div className="col">
							<label className="form-label" htmlFor="form2Example1">Assignee</label>
							<Select
								defaultValue={employeeId}
								isMulti
								name="employeeId"
								options={selectOptions(employees)}
								onChange={setEmployeeId}
								className="basic-multi-select"
								classNamePrefix="select"
							/>
						</div>
						<div className="col">
							<label className="form-label" htmlFor="form2Example1">Project</label>
							<Select
								defaultValue={projectId}
								isMulti
								name="projectId"
								options={selectOptions(projecs)}
								onChange={setProjectId}
								className="basic-multi-select"
								classNamePrefix="select"
							/>
						</div>
					</div>

					<div className="form-outline mb-2">
						<div className='d-flex justify-content-between'>
							<label className="form-label" htmlFor="form2Example2">Description</label>
							<label>{description.length}/30</label>
						</div>
						<textarea row='5' id="form2Example2" className={`form-control ${descriptionCheck}`} value={description} onChange={handleDescription} required></textarea>
					</div>

					<div>Priority</div>
					<div className="row g-3">
						<div className="col">
							<div className="form-check border rounded-3">
								<label className="form-label" htmlFor="form2Example2">Low</label>
								<input type="radio" className="form-check-input" aria-label="startDate" name="priority" value='Low' onChange={handlePriority} />
							</div>
						</div>
						<div className="col">
							<div className="form-check border rounded-3">
								<label className="form-label" htmlFor="form2Example2">Normal</label>
								<input type="radio" className="form-check-input" aria-label="startDate" name="priority" value='Normal' onChange={handlePriority} />
							</div>
						</div>
						<div className="col">
							<div className="form-check border rounded-3">
								<label className="form-label" htmlFor="form2Example2">High</label>
								<input type="radio" className="form-check-input" aria-label="endDate" name="priority" value='High' onChange={handlePriority} />
							</div>
						</div>
					</div>

					<div className="input-group my-4">
						<input type="file" className="form-control" aria-label="file" aria-describedby="basic-addon1" multiple value={taskDocs} onChange={handleTaskDocs} />
					</div>

					<div className='d-flex justify-content-center'>
						<input type="reset" className="btn btn-default btn-block me-4" onClick={handleReset} value='reset' />
						<button type="button" className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}
