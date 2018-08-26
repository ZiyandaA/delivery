import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import { changeLoginStatus } from '../actions/auth'
import { withRouter } from 'react-router-dom';
import FormComponent from '../components/FormComponent'

class Home extends Component {
    constructor() {
        super();
        this.logOut = this.logOut.bind(this);

    }
    logOut() {
        console.log(this.props.history.replace)
        axios.post("/users/logout")
            .then(data => {
                this.props.changeLoginStatus();
                this.props.history.push("/login");

                console.log(data)
            })
    }


    render() {
        
        if(!this.props.loggedIn) {
            return <Redirect to="/login" />
        }
        return(
            <div>
                <div style={{fontSize: 30, color: 'white'}}>Home</div>
                <FormComponent/>
                <p>
                    <button onClick={this.logOut} style={{fontSize: 15}}>logout</button>
                </p>
            </div>
        )
    }
}

export default connect(
    state => ({
        loggedIn: state.auth.loggedIn,
        state: state
    }),
    dispatch => ({
        changeLoginStatus: () => {
            dispatch(changeLoginStatus());
        }
    })
)(Home);
