import React, { Component } from 'react';



class Auth extends Component {

    render() {
        let {password, name, handleChange, handleSubmit, successMessage, label, mode} = this.props;
        
        const labelStyles = {
            
            display: 'inline-block',
            color: 'white',
            marginRight: 5,
            padding: 5,
            lineHeight: '25px',
        }
        const inputStyles = {
            width: 150,
            lineHeight: '25px'
        }
        const fieldStyles = {
            marginBottom: 10,
            marginLeft: 5,
        }
        return(
            <div style={{
                background: '#0068b1',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'inline-block',
                    width: '100%',
                    maxWidth: 500,
                }}>
                    <img src={'/logo.png'}/>
                    <div
                        style={{
                            color: 'lightblue',
                            paddingBottom: 50,
                            fontSize: 20,
                        }}
                    >
                        Messenger Pricing System
                    </div>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(mode)
                }}>
                    <div style={fieldStyles} >
                        <div
                            style={labelStyles}
                        >
                            Username
                        </div>
                        <input
                            style={inputStyles}
                            value={name} 
                            name="name" 
                            onChange={handleChange} 
                            type="text"
                            placeHoler="name"
                            required
                        />
                    </div>

                    <div style={fieldStyles}>
                        <div
                        style={labelStyles}
                        >
                            Password
                        </div>
                        <input
                            style={inputStyles}
                            value={password} 
                            name="password" 
                            onChange={handleChange} 
                            type="password"
                            placeholder="password"
                            required
                        />
                    </div>


                    <button type="submit">
                        { mode === "register" ? "Register" : "Log In"}
                    </button>
                    
                </form>
                {successMessage}
            </div>
        )
    }
}

export default Auth;
// onClick={handleSubmit}