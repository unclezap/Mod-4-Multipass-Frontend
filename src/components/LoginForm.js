import React, { Component } from 'react';
import { api } from '../api';

class LoginForm extends Component {
    constructor(){
        super()
        this.state = {
            error: false,
            loggedIn: false,
            fields: {
                username: "",
                password: ""
            }
        };
    };

    actualLogin(fields) {
        api.auth.login(fields).then(data => {
            if (data.error) {
                this.setState({
                    error: data.error
                }, () => console.log("you hit the error!"))
            } else {
               console.log(data)
               this.setState({
                   loggedIn: true
               })
            }
        })
    };

    handleChange = (e) => {
        const newFields = {...this.state.fields, [e.target.name]: e.target.value}
        this.setState({
            fields: newFields
        })
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.actualLogin(this.state.fields);
    }

    render() {
        return(
            <div>
                {this.state.loggedIn === true? <h1>You're logged in</h1>:<h1>Logged OUt</h1>}
                {this.state.error ? <h1>{this.state.error}</h1> : null}
                <div>
                    <form onSubmit={e => this.handleSubmit(e)}> 
                        {/* <label htmlFor="username" /> */}
                        <input type="text" name="username" onChange={this.handleChange} value={this.state.fields.username}></input>
                        {/* <label htmlFor="password" /> */}
                        <input type="password" name="password" onChange={this.handleChange} value={this.state.fields.password}></input>
                        <input type="submit" value="Log In"></input>
                    </form>
                </div>
            </div>
        )
    }
};

export default LoginForm;