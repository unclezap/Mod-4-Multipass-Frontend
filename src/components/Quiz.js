import React, { Component } from 'react';
import { api } from '../api';
import {Redirect} from 'react-router-dom';

class Quiz extends Component {
    constructor() {
        super();
        this.state ={
            submitted: false,
            quiz: {},
            questions: {},
            user: "",
            checkedAnswers: {}
        }
    }; 

    componentDidMount() {
        this.getQuestions(this.props);
    };

    //Grab questions from backend on page render.
    getQuestions(props) {
        let id = parseInt(this.props.match.params.id)
        api.quizzes.getQuiz(id).then(data =>
            {   
                this.setState({
                    user: data.user,
                    quiz: data.quiz,
                    questions: data.questions
                });
            }
        );
    };

    handleCheck(e) {
        const question_text = e.target.name;
        const value = e.target.value
        this.setState(prev=>({
            ...prev,
            checkedAnswers: {...prev.checkedAnswers,
                [question_text]: value
                }
        }))
    }

    handleSubmit(e) {
        e.preventDefault()
        let amountCorrect
        let userScoreObject
        this.setState({submitted: true})
        if (this.props.checkForMultipass !== "white") {
            alert("With Multipass, you always pass!  You got everything right!")
            amountCorrect = Object.values(this.state.checkedAnswers).filter(answer => answer)
            alert(`You got ${amountCorrect.length} right!`)
            userScoreObject = {
                score: amountCorrect.length,
                quiz_id: this.state.quiz.id
            }
            api.userScores.createUserScore(userScoreObject);
        } else {
            amountCorrect = Object.values(this.state.checkedAnswers).filter(answer=> answer === 'true')
            alert(`You got ${amountCorrect.length} right!`)

            userScoreObject = {
                score: amountCorrect.length,
                quiz_id: this.state.quiz.id
            }
            api.userScores.createUserScore(userScoreObject);
            // this.props.history.push('/');
        }
    };

    // Shows answers on page as one group.
    renderAnswers = (question, index) =>{
        const answerArray = question.answers;
        return answerArray.map(answer=>{
            let currentAnswer = answer.answer
            return (
                <div className="form-check">
                    <label htmlFor={currentAnswer} style={{marginRight: "5px"}}>{currentAnswer}</label>
                    <input type="radio" className={`group${index}`} onChange={e=>this.handleCheck(e)} name={question.text} value={answer.correct} />
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
            return(<div className="form-check questions" key={index}>
                <label className="form-check-label"htmlFor={currentQuestion}>{currentQuestion.text}</label><br/>
                {this.renderAnswers(currentQuestion, index)}
            </div>)
        });
    };

    renderQuizInfo() {
        return(
            <div >
                    <h2>{this.state.quiz.title}</h2>
                    <p>By: {this.state.user}</p>
            </div>
        );
    };

    render() {
        return (
            <div class="text-center">
                {!this.state.submitted ?
                <div>
                {this.renderQuizInfo()}
                <form name="quiz" className="form-group" onSubmit={e=>this.handleSubmit(e)}>
                    {this.renderQuestions()}
                    <input className="btn btn-outline-primary" type="submit" value="Get my Score!"/>
                </form> </div>: <Redirect to="/Browse" />}
            </div>
        )
    }
}

export default Quiz;