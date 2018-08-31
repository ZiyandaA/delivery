import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

import App from './App';

import store from './store'

import registerServiceWorker from './registerServiceWorker';


// import {loggedIn_PROP ,
//
// } from './constants/actions';


ReactDOM.render(
<Provider store={store} >
    <Router>
        <App />
    </Router>
</ Provider >, document.getElementById('root'));
registerServiceWorker();
