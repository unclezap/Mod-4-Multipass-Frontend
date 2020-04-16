import React, { Component } from 'react';
import { api } from '../api';

class QuizScore extends Component {
    constructor() {
        super();
        this.state ={
            quiz: {},
            scores: {},
            creator: ""
        }
    }

    componentDidMount() {
        this.getScores(this.props)
    }

    getScores(props) {
        api.scores.getUserScoresByQuiz(props.match.params.id)
        .then(data =>
                {   
                    this.setState({
                        quiz: data.quiz,
                        scores: data.scores,
                        creator: data.user
                    });
                }
        )
    }

    renderScores = () => {
        const sortedScoresArray = Object.entries(this.state.scores).map(entry => entry[1]).sort(function(a,b) {
            return b.score - a.score
        })
        return sortedScoresArray.slice(0,5).map((score, index) => {
            return (
                <div key={index}>
                    <p>{`Score: ${score.score}, User: ${score.user}`}</p>
                </div>
            )
        })
    }


    renderQuizInfo() {
        return(
            <div>
                <div>
                    <h2>{this.state.quiz.title}</h2>
                    <h5>{this.state.quiz.description}</h5>
                    <p>By: {this.state.creator}</p>
                </div>
            </div>
        )
    };

    render() {
        return (
            <div>
                {this.renderQuizInfo()}
                <h4>High Scores!</h4>
                {this.renderScores()}
            </div>
            
        )
    }
}

export default QuizScore;