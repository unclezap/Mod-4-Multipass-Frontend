import React from 'react'

function handleLogout() {
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