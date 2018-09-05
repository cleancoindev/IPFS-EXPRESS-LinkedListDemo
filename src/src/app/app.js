import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			returnedValue: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({ value: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		this.sendForm(this.state.value);
	}

	async sendForm(value) {
		const data = await axios.post('http://localhost:3000/api/ipfs', this.state);

		console.log('The Response', data.data[0].hash);
		this.setState({ returnedValue: data.data[0].hash });
		console.log('The state', this.state);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<label>
						Name:
						<input type="text" name="name" value={this.state.value} onChange={this.onChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
				<div>The IPFS Hash value: {this.state.returnedValue}</div>
				<span>
					Test it by loadking this link: <a href={'http://ipfs.io/ipfs/' + this.state.returnedValue}>LINK</a>
				</span>
			</div>
		);
	}
}

export default App;
