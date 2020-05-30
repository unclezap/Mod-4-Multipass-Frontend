import React, { Component } from 'react';
import { api } from '../api';
import {Redirect} from 'react-router-dom'

class QuizScore extends Component {
    constructor() {
        super();
        this.state ={
            quiz: {},
            scores: {},
            creator: "",
            here: true
        }
    }

    componentDidMount() {
        this.getScores(this.props)
    }

    getScores(props) {
        api.scores.getUserScoresByQuiz(props.thisQuiz)
        .then(data =>
                {   console.log(data)
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

    goBack = () => {
        this.setState({here: false})
    }

    render() {
        return (
            <div class="text-center">
                {this.renderQuizInfo()}
                <h4>High Scores!</h4>
                {this.renderScores()}
                {this.state.here === true
                    ? <button onClick={this.goBack}>
                        Return to Leaderboard
                      </button> 
                    : <Redirect to="/leaderboard" />}
            </div>
            
        )
    }
}

export default QuizScore;