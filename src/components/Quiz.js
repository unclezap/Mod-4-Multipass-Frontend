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

    getQuestions(props) {
        api.quizzes.getQuiz(props.match.params.id).then(data =>
                {   
                    this.setState({
                        user: data.user,
                        quiz: data.quiz,
                        questions: data.questions
                    });
                }
        )
            //question data is received, need to render questions
            //need to serialize answers here
            //need to put answers and questions in
    };

    renderQuestions = () => {
        const questions = this.state.questions
        console.log(questions)
        return Object.entries(questions).map((question, index) =>{
            return <Question 
            key={index}
            question_text={question[1].text}
            answers={question[1].answers}
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