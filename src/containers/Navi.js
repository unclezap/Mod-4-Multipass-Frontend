import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function Navi(props) {
    // use token value (true || false to determine which links to show.)
    const token = localStorage.getItem("token")

    return(
            <div className="navbar">
                <Link className="nav-link" to="/">Home</Link>
                {token ? <Link className="nav-link" to="/account">My Account</Link> : null}
                {token ? <Link className="nav-link" to="/new_quiz">Create Quiz</Link> : null}
                <Link className="nav-link" to='/Browse'>Browse</Link>
                <Link className="nav-link" to='/Popular'>Popular</Link>
                <Link className="nav-link" to='/Leaderboard'>Leaderboard</Link>
                {token ? null:<Link className="nav-link" to="/signup">Sign Up</Link>}
                {token ? <Button variant="outline-danger" onClick={props.onLogout}>Logout</Button>:<LoginForm className="form-group" onAuthenticate={props.onAuthenticate}/>}
            </div>
     )
};

export default Navi;