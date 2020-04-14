import React from 'react'
import AuthHOC from '../HOC/AuthHOC'

function handleLogout() {
    console.log("You're logged out")
    localStorage.removeItem("token");
  }

function LogoutForm() {

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default LogoutForm