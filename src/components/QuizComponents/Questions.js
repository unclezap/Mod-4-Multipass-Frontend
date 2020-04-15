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
                <h3>{this.props.question_text}</h3>
                <form>
                    {this.renderAnswers()}
                </form>
            </div>
        )
    }
}

export default Question;