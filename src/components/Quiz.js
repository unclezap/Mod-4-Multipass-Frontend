import React, { Component } from 'react';
import { api } from '../api';
import Question from './QuizComponents/Questions'


class Quiz extends Component {
    constructor() {
        super();
        this.state ={
            quiz: {},
            questions: {},
            user: "",
            checkedAnswers: []
        }
    };

    componentDidMount() {
        this.getQuestions(this.props);
    };

    checkAnswers(e) {
        e.preventDefault();
        console.log(e.target)
    };

    //Grab questions from backend on page render.
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


    // This function was for handle radio buttons before Quiz page refactor.
    // handleCheck(e) {
    //     console.log("clicking")
    //     this.setState(prev => ({
    //         ...prev,
    //         checkedAnswers: [e]
    //     }))
    // }


    renderQuestions = () => {
        const questions = {...this.state.questions}
        return Object.keys(questions).map((question, index) =>{
            return <Question 
            handleCheck={this.handleCheck.bind(this)}
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