import React from 'react';
import AuthHOC from '../HOC/AuthHOC';
import QuizCard from '../components/QuizCard';
import { Col, Button } from 'react-bootstrap';
import { api } from '../api';

type MyAccountProps = {
    user: User
}

const MyAccount: React.FC<MyAccountProps> = (props) => {

    const [quizClick, setQuizClick] = React.useState<boolean>(false)
    const [scoreClick, setScoreClick] = React.useState<boolean>(false)
    const [scores, setScores] = React.useState({})

    // componentDidMount() {
    //     this.getMyScores()
    // };

    const getMyScores = () => {
        api.scores.getUserScoresByUser(props.user.id)
            .then(data => {
                setScores({
                    scores: data
                })
            });
    };

    quizToggle = () => {
        this.setState((prev) => ({
            quizClick: !prev.quizClick
        })
        );
    };

    scoreToggle = () => {
        this.setState((prev) => ({
            scoreClick: !prev.scoreClick
        }));
    };

    seeMyQuizzes = () => {
        return this.props.myQuizzes.map((thisQuiz) => {
            return (<Col><QuizCard key={thisQuiz.id} quiz={thisQuiz} previousPage={"quizzes"} /></Col>)
        });
    };

    seeMyScores = () => {
        const scoresArray = Object.entries(this.state.scores).map(entry => entry[1])
        return scoresArray.map((thisScore) => {
            return (
                <Col>
                    <QuizCard key={thisScore.quiz.id} quiz={thisScore.quiz} previousPage={"leaderboard"} />
                    <h5>{`Score: ${thisScore.score}`}</h5>
                    <h6>{`Taken on ${thisScore.date}`}</h6>
                </Col>
            )
        });
    };

    render() {
        const { username } = this.props.user;

        return (
            <div>
                <h4>Username: {username}</h4>
                <Button variant="outline-dark" onClick={this.quizToggle}>My Quizzes</Button>
                {this.state.quizClick ? this.seeMyQuizzes() : null}
                <Button variant="outline-dark" onClick={this.scoreToggle}>My Scores</Button>
                {this.state.scoreClick ? this.seeMyScores() : null}
            </div>
        );
    };
};

export default AuthHOC(MyAccount);