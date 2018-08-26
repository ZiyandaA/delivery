import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './containers/Register';
import Login from './containers/Login';
import Home from './containers/Home';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { changeLoginStatus } from './actions/auth'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './containers/Header';

import PriceComponent from './components/OrderComponent';

import {store} from './index';

class App extends Component {
  constructor() {
    super();  //This function is to get all the properties to our component from Component that we inherit from.
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
      store.dispatch(changeLoginStatus());
    }) 
  }

 // /orders
 // /orders/:orderId
 // /update-order
 // /create-order

//  <Route path="/register" 
//         render={() => (
//         // someCondition ? trueReturn : false return
//           // if (somecondition) truereturn
//               //else falsereturn
//               this.props.loggedIn ? (
//                 <Redirect to="/" />
//               ) :
//               (
//                 <Register 
//                         label="register" 
//                         endpoint="signup"
//                       />
//               )
//         )}/>


// <Route 
//           path="/login" 
//           render={() => (
//             // someCondition ? trueReturn : false return
//               // if (somecondition) truereturn
//                   //else falsereturn
//                   this.props.loggedIn ? (
//                     <Redirect to="/" />
//                   ) :
//                   (
//                     <Register 
//                             label="login" 
//                             endpoint="signin"
//                           />
//                   )
//             )}
//         />

// <Route 
//           path="/order"
//           component={PriceComponent}
//         />
// <Route path="/create-order" render={() => <h1>Create order</h1>} />

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

// function mapStateToProps(state) {
//   return {
//     loggedIn: state.auth.loggedIn
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     changeLoginStatus: () => {
//       dispatch(changeLoginStatus());
//     }
//   }
// }

export default App;
// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App));
