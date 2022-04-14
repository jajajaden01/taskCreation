import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Form() {
	const navigate = useNavigate();
	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

	// States for Login
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const response = { loading: false, data: {}, message: '', error: false };
	const [severResponse, setSeverResponse] = useState(response);


	// Handling the email change
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	// Handling the password change
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	// Handling the form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setSeverResponse({ ...severResponse, loading: false, message: 'Please, fill all those fields.' })
		} else {
			await loginUser({ email, password });
		}
	};

	async function loginUser(credentials) {
		setSeverResponse({ ...severResponse, loading: true });
		return await fetch('http://localhost:4002/api/auth/login', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
		.then(jsonData => (jsonData.json()))
		.then(res => {
			if(res.data) setSeverResponse({ ...severResponse, loading: false, data: res.data })
			
			if (res.error) setSeverResponse({ ...severResponse, loading: false, message: res.error })
		});
	}

	useEffect(() => {
		if (Object.keys(severResponse.data).length !== 0) {
			localStorage.setItem('loggedInUser', JSON.stringify(severResponse.data));
			navigate('/tasks');
		}
		if (loggedInUser && loggedInUser.loggedIn) navigate('/tasks');
	}, [severResponse, navigate, loggedInUser]);

	return (
		<div className="row justify-content-center">
			<div className="col-5">
				<h3 className="text-center mt-5">Login</h3>
				<form onSubmit={handleSubmit}>
					{severResponse.message && <div className="alert alert-danger" role="alert">{severResponse.message}</div>}
					
					{/* <!-- Email input --> */}
					<div className="form-outline mb-4">
						<label className="form-label" htmlFor="form2Example1">Email</label>
						<input type="email" id="form2Example1" className="form-control" value={email} onChange={handleEmail} required />
					</div>

					{/* <!-- Password input --> */}
					<div className="form-outline mb-4">
						<label className="form-label" htmlFor="form2Example2">Password</label>
						<input type="password" id="form2Example2" className="form-control" value={password} onChange={handlePassword} required />
					</div>

					<div className="text-center">
						{/* <!-- Submit button --> */}
						<button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit} >Sign in</button>

						{/* <!-- view tasks --> */}
						<p>
							<Link to="/tasks">View Tasks</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
