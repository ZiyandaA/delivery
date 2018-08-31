import React, { Component } from 'react';
import './App.css';
import Register from './containers/Register';
import Home from './containers/Home';
import axios from 'axios';
import { loginAction } from './store/modules/auth'
import {
  Route,
} from 'react-router-dom';
import Header from './containers/Header';

import store from './store';

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
    console.log(this.props);
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
        <Route exact path="/orders/:orderId" render={() => <h1>Single order</h1>} />
        <Route path="/update-order" render={() => <h1>Update order</h1>} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Register} />
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
