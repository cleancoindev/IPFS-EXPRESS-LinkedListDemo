import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			nonce: 0,
			pointerStart: 0,
			pointerEnd: 0,
			previousHash: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({ value: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		this.setEndPointer();
		this.sendForm();
		this.incrementNonce();
	}

	async sendForm() {
		const data = await axios.post('http://localhost:3000/api/ipfs', this.state);

		console.log('The Response', data.data[0].hash);
		this.setState(() => {
			return { previousHash: data.data[0].hash };
		});
		console.log('The state', this.state);
	}

	incrementNonce() {
		const nonce = this.state.nonce + 1;
		this.setState(() => {
			return { nonce };
		});
	}

	setStartPointer(pointerStart) {
		this.setState(() => {
			return { pointerStart };
		});
	}

	setEndPointer(pointer) {
		if (!pointer) {
			const pointerEnd = this.state.pointerEnd + 1;
			this.setState(() => {
				return { pointerEnd };
			});
		} else {
			this.setState(() => {
				return { pointerEnd: pointer };
			});
		}
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
				<div>The IPFS Hash value: {this.state.previousHash}</div>
				<span>
					Test it by loading this link: <a href={'http://ipfs.io/ipfs/' + this.state.previousHash}>LINK</a>
				</span>
			</div>
		);
	}
}

export default App;
