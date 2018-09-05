import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/app/app.js';

import { Provider } from 'react-redux';
import store from './src/store/stockStore';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
