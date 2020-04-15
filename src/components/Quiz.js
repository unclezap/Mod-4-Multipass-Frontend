import React, { Component } from 'react';
import { api } from '../api';
import Question from './QuizComponents/Questions'


class Quiz extends Component {
    constructor() {
        super();
        this.state ={
            quiz: {},
            questions: {},
            user: ""
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

    renderQuestions = () => {
        const questions = {...this.state.questions}
        return Object.keys(questions).map((question, index) =>{
            return <Question 
            key={index}
            question_text={questions[question].text}
            answers={questions[question].answers}
            />
        }) 
    }


    renderQuizInfo() {
        return(
            <div>
                <div>
                    <h2>{this.state.quiz.title}</h2>
                    <p>By: {this.state.user}</p>
                </div>
            </div>
        )
    };

    render() {
        return (
            <div>
                {this.renderQuizInfo()}
                {this.renderQuestions()}
            </div>
            
        )
    }
}

export default Quiz;