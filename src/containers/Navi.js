import React from 'react';
import LoginForm from '../components/LoginForm';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

function Navi(props) {
    return(
        <Navbar>
            {localStorage.getItem("token")? <button onClick={props.onLogout}>Logout</button>:<LoginForm onAuthenticate={props.onAuthenticate}/>}
                <Nav.Link href='/' > Home</Nav.Link>
            <Nav.Link href='/account' >My Account</Nav.Link>
            <Nav.Link href='/browse' >Browse</Nav.Link>
        </Navbar>
     )
};

export default Navi;