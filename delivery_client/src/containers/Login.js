import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props); //super function to inherit all the properties (methids and fields) from the Component
        this.state = {
            username: '',
            password: '',
            open: false,
            successMessage: ""
        }
    }
        
    handleSubmit() {

    }
    
    render() {
        return(
            <div>
                Login
            </div>
        )
    }
}
/*
1. Create 2 inputs for username and pass
2. create fields in the state fo them
3. Create handlers(onCLick functions)
4. Create submit button
5. create onSubmit event to send post request to the signin endpoint on the server
6. Display successs message (or error message)


*/
export default Login;