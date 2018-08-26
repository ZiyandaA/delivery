import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk'
import reducer from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css'
import {
    BrowserRouter as Router,
  } from 'react-router-dom';
  import {
    loggedIn_PROP ,
    
} from './constants/actions';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store} >
    <Router>
        <App />
    </Router>
</ Provider >, document.getElementById('root'));
registerServiceWorker();
