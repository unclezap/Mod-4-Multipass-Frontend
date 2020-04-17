import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Navi(props) {
    return(
            <Navbar>
                <Link className="nav-link" to="/">Home</Link>
                {localStorage.getItem("token") ? <Link className="nav-link" to="/account">My Account</Link> : null}
                {localStorage.getItem("token")? <Link className="nav-link" to="/new_quiz">Create Quiz</Link> : null}
                <Link className="nav-link" to='/Browse'>Browse</Link>
                <Link className="nav-link" to='/Popular'>Popular</Link>
                <Link className="nav-link" to='/Leaderboard'>Leaderboard</Link>
                {localStorage.getItem("token")?null:<Link className="nav-link" to="/signup">Sign Up</Link>}
                {localStorage.getItem("token")?<Button variant="outline-danger" onClick={props.onLogout}>Logout</Button>:<Form><LoginForm onAuthenticate={props.onAuthenticate}/></Form>}
            </Navbar>
     )
};

export default Navi;