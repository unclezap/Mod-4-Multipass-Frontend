import React, { Component } from 'react';
import { api } from '../api';


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
    handleCheck(e) {
        // Can console.log value, but can't add them to state???
        console.log(e.target.value)
        // this.setState(prev => ({
        //     ...prev,
        //     checkedAnswers: [...prev.checkedAnswers, e.target.value]
        // }))
    };

    // Need to get the state after adding checked answers. then post that.
    handleSubmit(e) {
        e.preventDefault()
        console.log(e.target)
    };

    // Shows answers on page as one group.
    renderAnswers = (question) =>{
        const answerArray = question.answers;
        return answerArray.map(answer=>{
            let currentAnswer = answer.answer
            return (
                <div className="form-check">
                    <label htmlFor={currentAnswer} style={{marginRight: "5px"}}>{currentAnswer}</label>
                    <input type="radio" onChange={e=>this.handleCheck(e)} name={question.text} value={answer.answer} />
                </div>
            )
        })
    }

    // Creates a div for each question.
    renderQuestions = () => {
        const questions = this.state.questions;
        return Object.keys(questions).map((question, index) =>{
            //current questions is a shortcut to accessing our question object.
            const currentQuestion = questions[question];
            return(<div className="form-check" key={index}>
                <label className="form-check-label"htmlFor={currentQuestion}>{currentQuestion.text}</label><br/>
                {this.renderAnswers(currentQuestion)}
            </div>)
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
                <form name="quiz" className="form-group" onSubmit={e=>this.handleSubmit(e)}>
                    {this.renderQuestions()}
                    <input className="btn btn-outline-primary" type="submit" value="Get my Score!"/>
                </form>
            </div>
        )
    }
}

export default Quiz;