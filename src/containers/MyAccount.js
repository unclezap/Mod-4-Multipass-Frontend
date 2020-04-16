import React from 'react';
import AuthHOC from '../HOC/AuthHOC';

function MyAccount(props) {
    const {username} = props.user
    return(
        <div>
            <h4>Username: {username}</h4>
        </div>
    )
};

export default AuthHOC(MyAccount);