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
    };

    componentDidMount() {
        this.getQuestions(this.props);
    };

    checkAnswers(e) {
        e.preventDefault();
        console.log(e.target)
        // Succesfully grab the Question nodes. just needs to burrow in and see which buttons are checked. 
        // Maybe we shouldn't send over the correct key, but do a fetch here and see if the answer.id matches the correct answer.
        // going bed now
    };

    getQuestions(props) {
        api.quizzes.getQuiz(props.match.params.id).then(data =>
            {   
                this.setState({
                    user: data.user,
                    quiz: data.quiz,
                    questions: data.questions
                });
            }
        );
    };


    renderQuestions = () => {
        const questions = {...this.state.questions}
        return Object.keys(questions).map((question, index) =>{
            return <Question 
            key={index}
            question_text={questions[question].text}
            question_id={questions[question].id}
            answers={questions[question].answers}
            />
        });
    };

    renderQuizInfo() {
        return(
            <div>
                    <h2>{this.state.quiz.title}</h2>
                    <p>By: {this.state.user}</p>
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.renderQuizInfo()}
                <form onSubmit={this.checkAnswers}>
                    {this.renderQuestions()}
                    <input className="btn btn-outline-primary" type="submit" value="Get my Score!"/>
                </form>
            </div>
        )
    }
}

export default Quiz;