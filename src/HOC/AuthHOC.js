import React from 'react'
import {Redirect} from 'react-router-dom'

const AuthHOC = WrappedComponent => {
    return class AuthHOC extends React.Component {
        isAuthorized = () => {
            if (localStorage.getItem("token")) {
                return true
            } else {
                return false
            }
        }

        render() {
            return (
                <> {this.isAuthorized()
                    ?<WrappedComponent {...this.props} />
                    :<Redirect to="/" />}
                </>
            )
        }
    }
}

export default AuthHOC;