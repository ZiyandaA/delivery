import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { changeLoginStatus } from '../actions/auth'
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        console.log(this.props.state)
        console.log(this.props.history.replace)
        axios.post("/users/logout")
            .then(data => {
                this.props.changeLoginStatus();
                this.props.history.push("/login");

                console.log(data)
            })
    }
    renderAuthButtons() {
        if (this.props.loggedIn) {
            return <button onClick={this.logOut} style={{float: 'right', fontSize:'15px'}}>logout</button>
        }
        else {
            return <div><Link to="/login">login</Link>, <Link to="/register">register</Link></div>
        }
    }
    render() {
        return(
            <div>
                
                {this.renderAuthButtons()}
            </div>
        )
    }

}

export default withRouter(connect(
    state => ({
        loggedIn: state.auth.loggedIn,
        state: state
    }),
    dispatch => ({
        changeLoginStatus: () => {
            dispatch(changeLoginStatus());
        }
    })
)(Header));

