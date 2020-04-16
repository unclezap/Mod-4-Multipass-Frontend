import React from 'react';
import LoginForm from '../components/LoginForm';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Navi(props) {
    return(
            <Navbar>
                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                {localStorage.getItem("token") ? <Nav.Link><Link to="/account">My Account</Link></Nav.Link> : null}
                <Nav.Link><Link to='/Browse'>Browse</Link></Nav.Link>
                <Nav.Link><Link to='/Leaderboard'>Leaderboard</Link></Nav.Link>
                {localStorage.getItem("token")?null:<Nav.Link><Link to="/signup">Sign Up</Link></Nav.Link>}
                {localStorage.getItem("token")?<button onClick={props.onLogout}>Logout</button>:<Form><LoginForm onAuthenticate={props.onAuthenticate}/></Form>}
            </Navbar>
     )
};

export default Navi;