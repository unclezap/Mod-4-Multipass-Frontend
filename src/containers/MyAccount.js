import React from 'react';
import AuthHOC from '../HOC/AuthHOC';
import QuizCard from '../components/QuizCard';
import {Col} from 'react-bootstrap';
import { api } from '../api';

class MyAccount extends React.Component {

    state = {
        quizClick: false,
        scoreClick: false,
        scores: {}
    }

    componentDidMount() {
        this.getMyScores()
    }

    getMyScores() {
        api.scores.getUserScoresByUser(this.props.user.id)
        .then(data => {
            this.setState({
                scores: data
            })
        })
    }

    quizToggle = () => {
        this.setState((prev) => ({
                quizClick: !prev.quizClick
            })
        )
    }

    scoreToggle = () => {
        this.setState((prev) => ({
            scoreClick: !prev.scoreClick
        }))
    }

    seeMyQuizzes = () => {
        return this.props.myQuizzes.map((thisQuiz) => {
                return (<Col><QuizCard key={thisQuiz.id} quiz={thisQuiz} previousPage={"leaderboard"}/></Col>)
            })
    }

    seeMyScores = () => {
        const scoresArray = Object.entries(this.state.scores).map(entry => entry[1])
        return scoresArray.map((thisScore) => {
            return (
                <Col>
                    <QuizCard key={thisScore.quiz.id} quiz={thisScore.quiz} previousPage={"quizzes"}/>
                    <h5>{`Score: ${thisScore.score}`}</h5>
                    <h6>{`Taken on ${thisScore.date}`}</h6>
                </Col>
            )
        })
    }

    render() {
        const { username } = this.props.user

        return(
            <div>
                <h4>Username: {username}</h4>
                <button onClick={this.quizToggle}>My Quizzes</button>
                {this.state.quizClick ? this.seeMyQuizzes() : null}
                <button onClick={this.scoreToggle}>My Scores</button>
                {this.state.scoreClick ? this.seeMyScores(): null}
            </div>
        )
    }
};

export default AuthHOC(MyAccount);