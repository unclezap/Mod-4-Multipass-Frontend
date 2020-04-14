import React from 'react'
import {Redirect} from 'react-router-dom'

const AuthHOC = WrappedComponent => {
    return class AuthHOC extends React.Component {
        isAuthorized = () => {
            if (localStorage.getItem("token")) {
                return false
            } else {
                return true
            }
        }

        render() {
            return (
                <> {this.isAuthorized()
                    ?<WrappedComponent {...this.props} />
                    :null}
                </>
            )
        }
    }
}

export default AuthHOC