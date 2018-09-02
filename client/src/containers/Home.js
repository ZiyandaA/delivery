import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

import { loginAction } from '../store/modules/auth'
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
            const { location } = this.props;
            return <Redirect to={{
                pathname: "/login",
                state: {
                    referrer: location.pathname + location.search
                }
            }} />
        }
        const { mode, orderId } = queryString.parse(this.props.location.search)
        const formProps = mode === 'edit' ? { mode, orderId }: { mode: 'create'};

        console.log();
        return(
            <div>
                <div style={{fontSize: 30, color: 'white'}}>Home</div>
                <FormComponent {...formProps}/>
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
            dispatch(loginAction());
        }
    })
)(Home);
