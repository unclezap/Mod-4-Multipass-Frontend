import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function NavBar(props) {
    return(
        <div>
            {localStorage.getItem("token")? <button onClick={props.onLogout}>Logout</button>:<LoginForm onAuthenticate={props.onAuthenticate}/>}
        <NavLink to='/' active={props}> Home</NavLink><br />
        <NavLink to='/account' active={props}>My Account</NavLink><br />
        <NavLink to='/browse' active={props}>Browse</NavLink><br />
        {/* NavLink to different ShowPage Views */}
        {/* NavLink to different ShowPage Views */}
        {/* NavLink to different ShowPage Views */}
            
        </div>
    )
};

export default NavBar