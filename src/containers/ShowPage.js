import React, { Component } from 'react';
import Browse from '../components/Browse'

class ShowPage extends Component {
    render(){
        return(
            <div>
                {/* Details to come */}
                {/* {add a ternary to show either the browse component or quiz component?} */}
                <Browse />
                
                <h3>This is the showpage.</h3>
            </div>
        )
    };
};

export default ShowPage;