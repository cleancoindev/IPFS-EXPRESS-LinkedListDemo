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
			previousHash: '',
			demoHistory: []
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

		//Set DemoHistory

		this.setState((state) => {
			return { demoHistory: [ ...state.demoHistory, data.data[0].hash ] };
		});

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
			<div className="MainApp">
				<span>
					<h2>IPFS-EXPRESS: Linked List (In react)</h2>
				</span>
				<form onSubmit={this.onSubmit} className="form">
					<label>
						<span id="valueInput">Value:</span>
						<input type="text" name="name" value={this.state.value} onChange={this.onChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
				<div id="space">The IPFS Hash value: {this.state.previousHash}</div>
				<span>
					Test it by loading this link: (Infura IPFS Gateway){' '}
					<a href={'http://ipfs.io/ipfs/' + this.state.previousHash}>LINK</a>
				</span>
				<div className="history">
					<span>History:</span>
					<ol>
						{this.state.demoHistory.map((hash) => (
							<li key={hash}>
								<a href={'http://ipfs.io/ipfs/' + hash}>{hash}</a>
							</li>
						))}
					</ol>
				</div>
				<span id="space">
					{' '}
					By <a href="www.dennisonbertram.com">Dennison Bertram</a> Source:{' '}
					<a href="https://github.com/crazyrabbitLTC/IPFS-EXPRESS-LinkedListDemo">
						https://github.com/crazyrabbitLTC/IPFS-EXPRESS-LinkedListDemo
					</a>
				</span>
			</div>
		);
	}
}

export default App;
