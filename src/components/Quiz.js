import React, { Component } from 'react';
import { api } from '../api';


class Quiz extends Component {
    constructor() {
        super();
        this.state ={
            questions: [],
            quiz: {},
            errorMessage: ""
        }
    }

    componentDidMount() {
        this.getQuestions(this.props)
    }

    buildQuiz() {
        return (
            <h2>{this.state.quiz.title}</h2>
            // etc.
        )
    }

    getQuestions(props) {
        api.quizzes.getQuiz(props.match.params.id).then(data =>
                {   if (data.message) {
                    this.setState({
                        errorMessage: data.message
                    })
                } else {
                    this.setState({
                        questions: data.questions,
                        quiz: data.quiz
                    });
                }
            }
        )
            //question data is received, need to render questions
    };

    render() {
        return (
            <div>
                {this.state.errorMessage.length === 0 ? this.buildQuiz() : <h2>{this.state.errorMessage}</h2>}
            </div>
            
        )
    }
}

export default Quiz;