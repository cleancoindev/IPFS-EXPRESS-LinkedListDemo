import _ from 'lodash';
import './style.css';
import Donut from './donut.jpg';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './src/store/stockStore'


ReactDOM.render(
  <Provider store={store}>
  <div>Hello, world!</div>
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
