import React, { Component } from 'react';
import NewQuestions from './NewQuestions';
import { api } from '../api';
import {Redirect} from 'react-router-dom'

const API_ROOT = 'http://localhost:3000' 

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
            <div>
                {this.state.here
                ? <form onSubmit={(e) => this.handleSubmit(e)} onChange={this.handleChange} >
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" /> 
                <label htmlFor="description">Description</label>
                <input id="description" type="text" name="description" /> 
                <label htmlFor="category">Category</label>
                <input id="category" type="text" name="category" /> 

                <NewQuestions questions={this.state.questions} addAnswer={this.addAnswer}/>

                <button onClick={this.addQuestion}>Add another question</button>

                <input type="submit" value="Make Quiz!"></input>
                 </form>
                : <Redirect to={"/quizzes/" + this.state.newQuiz}/>}
                
            </div>
        )
    }
}

export default NewQuiz;