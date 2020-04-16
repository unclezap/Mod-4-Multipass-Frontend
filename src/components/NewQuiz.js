import React, { Component } from 'react';
import NewQuestions from './NewQuestions';

class NewQuiz extends Component {

    state = {
        title: "",
        questions: [
            {   
                id: "sdg",
                text:"",
                answers: [
                    {
                        id: "rth",
                        text: "",
                        correct: false
                    }
                ]
            }
        ]
    }

    handleSubmit = (e) => { e.preventDefault() }

    handleChange =(e) => {
        console.log(e.target.value)
        if (e.target.name === "title") {
            this.setState({
                title: e.target.value
            })
        } else if (e.target.name === "question") {
            let input = e.target.value
            let id = e.target.id
            this.setState(prev => {
                const newQuestions = prev.questions.map((thisQuestion) => {
                    if (thisQuestion.id !== id) {
                        return thisQuestion
                    } else {
                        return {...thisQuestion, text: input}
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
                                return {...thisAnswer, text: input}
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
        this.setState((prev) => ({
            questions: [...prev.questions, {
                id: Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0,12),
                text:"",
                answers: [
                    {
                        id: Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0,12),
                        text: "",
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
                        text: "",
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
                <form onSubmit={e => this.handleSubmit(e)} onChange={this.handleChange} >
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" name="title" /> 

                    <NewQuestions questions={this.state.questions} addAnswer={this.addAnswer}/>

                    <button onClick={this.addQuestion}>Add another question</button>

                    <input type="submit" value="Make Quiz!"></input>
                </form>
            </div>
        )
    }
}

export default NewQuiz;