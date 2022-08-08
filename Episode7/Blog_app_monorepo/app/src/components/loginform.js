const LoginForm = ({
	handleLogin,
	setUsername,
	setPassword,
	username,
	password,
}) => {
	return (
		<>
			<h2>Log in </h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Username: </label>
					<input
						type='text'
						value={username}
						name='Username'
						placeholder='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<label>Password: </label>
					<input
						type='password'
						value={password}
						name='Password'
						placeholder='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id='formLoginButton' type='submit'>
					Log in
				</button>
			</form>
		</>
	)
}

export default LoginForm
