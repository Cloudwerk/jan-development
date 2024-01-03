import "./styles.css";

function App() {
	return (
		<>
			<form className="form">
				<div className="form-group error">
					<label className="label" htmlFor="email">
						Email
					</label>
					<input className="input" type="email" id="email" value="test@test.com" />
					<div className="msg">Must end in @webdevsimplified.com</div>
				</div>
				<div className="form-group">
					<label className="label" htmlFor="password">
						Password
					</label>
					<input className="input" value="Password123!" type="password" id="password" />
				</div>
				<button className="btn" type="submit">
					Submit
				</button>
			</form>
		</>
	);
}

export default App;
