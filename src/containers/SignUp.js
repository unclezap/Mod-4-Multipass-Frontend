import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { api } from '../api';
import { Container, Row, Col } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            signedUp: false,
            errors: false,
            fields: {
                username: "",
                password: "",
                verifyPassword: ""
            }
        };
    };

    handleChange = e => {
        const newFields = {...this.state.fields, [e.target.name]: e.target.value};
        this.setState({
            fields: newFields
        });
    };
    
    handleSubmit = e => {
        e.preventDefault()
        let userObject = {
            username: this.state.fields.username,
            password: this.state.fields.password
        }
        e.preventDefault();
        if (this.state.fields.password !== this.state.fields.verifyPassword) {
            alert("Passwords do not match. Please try again.")
        } else {
            api.user.createUser(userObject);
            // this.props.history.push('/');
            console.log("hi")
            if (localStorage.getItem("token")) {
                this.props.easterEgg()
            }
            alert("Account creation succesful. Log in with your new credentials.")
            this.setState({signedUp: true})
        };

        
        
    }

    render() {
        return(
             <Container>
                {!this.state.signedUp ? <Row >
                    <Col xs={5}>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Form.Group >
                                <Form.Label>
                                    Username:
                                </Form.Label>
                                <Form.Control 
                                    name="username" 
                                    placeholder="New Username" 
                                    onChange={this.handleChange}
                                    type="text" 
                                    value={this.state.fields.username}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Password:
                                </Form.Label>
                                <Form.Control 
                                    name="password"
                                    onChange={this.handleChange}
                                    placeholder="Password" 
                                    type="password" 
                                    value={this.state.fields.password}
                                    />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>
                                    Verify Password:
                                </Form.Label>
                                <Form.Control 
                                name="verifyPassword"
                                onChange={this.handleChange}
                                placeholder="Password"
                                value={this.state.fields.verifyPassword}
                                type="password"
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary">Submit</Button>
                        </Form>
                    </Col>
                </Row> : <Redirect to="/"/>}
            </Container> 
        )
    }
}


export default SignUp;