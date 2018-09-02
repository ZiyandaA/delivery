import React, { Component } from 'react';
import axios from 'axios';
import {
  Route,
} from 'react-router-dom';

import './App.css';

import store from './store';
import { loginAction } from './store/modules/auth'

import Header from './containers/Header';
import Register from './containers/Register';
import Home from './containers/Home';

import OrderComponent from './components/OrderComponent'



class App extends Component {
  constructor(props) {
    super(props);  //This function is to get all the properties to our component from Component that we inherit from.
    this.state = {
      loggedIn: false
    };
  }
  /*
    1. Mount methods.
      a) ComponentWillMount
      b) ComponentDidMount
  */
  componentDidMount() {
    axios.get('/check')
        .then(data => {
          store.dispatch(loginAction());
        })
  }

  render() {
    return (
      <div  style={{ maxWidth: 600, margin: '0 auto', padding: 15,}}>
        <Header />
        <Route exact path="/orders" render={() => <h1>All Orders</h1>} />
        <Route exact path="/orders/:orderId" component={OrderComponent} />
        <Route path="/update-order" render={() => <h1>Update order</h1>} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Register} />
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
