import React from 'react';
import LoginForm from '../components/LoginForm';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Navi(props) {
    return(
            <Navbar>
                <Nav.Item>
                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    {localStorage.getItem("token") ? <Nav.Link><Link to="/account">My Account</Link></Nav.Link> :null}
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link><Link to='/browse'>Browse</Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link><Link to='/leaderboard'>Leaderboard</Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    {localStorage.getItem("token")?<button onClick={props.onLogout}>Logout</button>:<Form><LoginForm onAuthenticate={props.onAuthenticate}/></Form>}
                </Nav.Item>
            </Navbar>
     )
};

export default Navi;