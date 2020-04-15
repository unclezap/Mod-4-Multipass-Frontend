import React, { Component } from 'react';

class Question extends Component {


    render() {
        return(
            <div>
                <h1>{this.props.question_text}</h1>
            </div>

        )
    }
}

export default Question;