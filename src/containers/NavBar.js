import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

function NavBar(props) {
    return(
        <div>
        <NavLink to='/' active={props} >Home</NavLink>
        <NavLink to='/account' active={props}>My Account</NavLink>
        {/* NavLink to different ShowPage Views */}
        {/* NavLink to different ShowPage Views */}
        {/* NavLink to different ShowPage Views */}
            
        </div>
    )
};

export default NavBar