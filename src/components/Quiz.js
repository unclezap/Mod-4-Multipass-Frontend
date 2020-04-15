import React, { Component } from 'react';
import { api } from '../api';


class Quiz extends Component {
    constructor() {
        super();
        this.state ={
            questions: [],
            quiz: {}
        }
    }

    componentDidMount() {
        this.getQuestions(this.props)
    }

    buildQuiz(data) {

    }

    getQuestions(props) {
        api.quizzes.getQuiz(props.match.params.id).then(data =>
            {
                this.setState({
                    questions: []
                });
                console.log(data)
            }
        )
            //question data is received, need to render questions
            //need to serialize answers here
            //need to put answers and question in
    };

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Quiz;