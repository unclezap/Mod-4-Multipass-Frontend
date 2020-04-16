import React, { Component } from 'react';
import { api } from '../api';
import Button from 'react-bootstrap/Button';

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            error: false,
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
                }, 
                () => alert(this.state.error))
            } else {
            localStorage.setItem("token", data.jwt);
            this.props.onAuthenticate(data);
            }
        })
    };

    handleChange = (e) => {
        const newFields = {...this.state.fields, [e.target.name]: e.target.value};
        this.setState({
            fields: newFields
        });
    };
    
    handleSubmit(e) {
        e.preventDefault();
        this.actualLogin(this.state.fields);
    }

    showLoginButton() {
        return (
            <div>
                    <form onSubmit={e => this.handleSubmit(e)}> 
                        <label htmlFor="username" />
                        <input type="text" name="username" onChange={this.handleChange} value={this.state.fields.username}></input>
                        <label htmlFor="password" />
                        <input type="password" name="password" onChange={this.handleChange} value={this.state.fields.password}></input>
                        <Button variant="outline-primary" type="submit">Log In</Button>
                    </form>
                </div>
        )
    }




    render() {
        return(
            <div>
                {this.showLoginButton()}
            </div>
        )
    }
};
export default LoginForm;
