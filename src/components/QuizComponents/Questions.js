import React, { Component } from 'react';
import Answer from './Answer';

class Question extends Component {

    renderAnswers = () =>{
        const answers = this.props.answers
        return Object.keys(answers).map((object, index) => {
            return <Answer 
            key={index}
            answer={answers[object]}
            />
        })
    }

    render() {
        return(
            <div>
                <label htmlFor={this.props.question_text} />
                {this.renderAnswers()}
            </div>
        )
    }
}

export default Question;