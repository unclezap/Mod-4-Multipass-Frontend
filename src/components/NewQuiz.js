import React, { Component } from 'react';
import NewQuestions from './NewQuestions';
import { api } from '../api';
import {Redirect} from 'react-router-dom'

class NewQuiz extends Component {

    state = {
        here: true,
        newQuiz: "",
        title: "",
        description: "",
        category: "",
        questions: [
            {   
                id: "sdg",
                question_text:"",
                answers: [
                    {
                        id: "rth",
                        answer_text: "",
                        correct: false
                    }
                ]
            }
        ]
    }

    handleSubmit = (e) => { 
        e.preventDefault()
        api.quizzes.createQuiz(this.state)
        .then(data => {
            if (data.message) {
                alert(`${data.message}`)
            } else {
                console.log(data)
                this.setState({here: false, newQuiz: data.id}) 
                this.props.quizMade(data)
            }
        })
    }

    handleChange =(e) => {
        if (e.target.name === "title") {
            this.setState({
                title: e.target.value
            })
        } else if (e.target.name === "description") {
            this.setState({
                description: e.target.value
            })
        } else if (e.target.name === "category") {
            this.setState({
                category: e.target.value
            })
        } else if (e.target.name === "question") {
            let input = e.target.value
            let id = e.target.id
            this.setState(prev => {
                const newQuestions = prev.questions.map((thisQuestion) => {
                    if (thisQuestion.id !== id) {
                        return thisQuestion
                    } else {
                        return {...thisQuestion, question_text: input}
                    }
                })
                return(
                    {questions: newQuestions}
                )
            })
        } else if (e.target.name === "answer") {
            let input = e.target.value
            let qid = e.target.className
            let id = e.target.id
            this.setState(prev => {
                const newQuestions = prev.questions.map((thisQuestion) => {
                    if (thisQuestion.id !== qid) {
                        return thisQuestion
                    } else {
                        const newAnswers = thisQuestion.answers.map((thisAnswer) => {
                            if (thisAnswer.id !== id) {
                                return thisAnswer
                            } else {
                                return {...thisAnswer, answer_text: input}
                            }
                        })
                        return (
                            {...thisQuestion, answers: newAnswers}
                        )
                    }
                })
                return(
                    {questions: newQuestions}
                )
            })
        } else if (e.target.name === "checkbox") {
            let qid = e.target.className
            let id = e.target.id
            this.setState(prev => {
                const newQuestions = prev.questions.map((thisQuestion) => {
                    if (thisQuestion.id !== qid) {
                        return thisQuestion
                    } else {
                        const newAnswers = thisQuestion.answers.map((thisAnswer) => {
                            if (thisAnswer.id !== id) {
                                return thisAnswer
                            } else {
                                return {...thisAnswer, correct: !thisAnswer.correct}
                            }
                        })
                        return (
                            {...thisQuestion, answers: newAnswers}
                        )
                    }
                })
                return(
                    {questions: newQuestions}
                )
            })
        }
    }

    addQuestion = (e) => {
        e.preventDefault()
        this.setState((prev) => ({
            questions: [...prev.questions, {
                id: Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0,12),
                text:"",
                answers: [
                    {
                        id: Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0,12),
                        question_text: "",
                        correct: false
                    }
                ]
            }]
        }))
    }

    addAnswer = (questionId) => {
        this.setState(prev => {
            const newQuestions = prev.questions.map((thisQuestion) => {
                if (thisQuestion.id !== questionId) {
                    return thisQuestion
                } else {
                    return {...thisQuestion, answers:[...thisQuestion.answers, {
                        id: Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0,12),
                        answer_text: "",
                        correct: false
                    }]}
                }
            })
            return(
                {questions: newQuestions}
            )
        })
    }

    render() {
        return (
            <div className="container">
                {this.state.here
                ? <form onSubmit={(e) => this.handleSubmit(e)} onChange={this.handleChange} >
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" style={{width:"30%"}} id="title" type="text" name="title"/> 
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input id="description" className="form-control" style={{width:"30%"}} type="text" name="description" /> 
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input id="category" className="form-control" style={{width:"30%"}} type="text" name="category" /> 
                </div>

                <NewQuestions questions={this.state.questions} addAnswer={this.addAnswer}/>

                <button className="btn btn-outline-primary" style={{marginRight:"10px"}} onClick={this.addQuestion}>Add another question</button>

                <input type="submit" className="btn btn-outline-primary" value="Make Quiz!"></input>
                 </form>
                : <Redirect to={"/quizzes/" + this.state.newQuiz}/>}
                
            </div>
        )
    }
}

export default NewQuiz;