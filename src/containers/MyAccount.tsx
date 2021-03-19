import React from 'react';
import AuthHOC from '../HOC/AuthHOC';
import QuizCard from '../components/QuizCard';
import { Col, Button } from 'react-bootstrap';
import { api } from '../api';
import { User, Quiz, Score } from '../types'

type MyAccountProps = {
    user: User
    myQuizzes: Quiz[]
}

type ScoreState = {
    3: {
        quiz: 'asdf'
        score: 54
        date: 3/4
    }

id: Score
}

const MyAccount: React.FC<MyAccountProps> = (props) => {

    const [quizClick, setQuizClick] = React.useState<boolean>(false)
    const [scoreClick, setScoreClick] = React.useState<boolean>(false)
    const [scores, setScores] = React.useState({})
    const { username } = props.user;

    //TODO refactor to use effect
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

    const quizToggle = () => {
        setQuizClick(!quizClick)
    };

    const scoreToggle = () => {
        setScoreClick(!scoreClick);
    };

    const seeMyQuizzes = () => {
        return props.myQuizzes.map((thisQuiz: Quiz) => {
            return (<Col><QuizCard key={thisQuiz.id} quiz={thisQuiz} previousPage={"quizzes"} /></Col>)
        });
    };

    const seeMyScores = () => {
        const scoresArray = Object.entries(scores).map(entry => entry[1])
        return scoresArray.map((thisScore: Score) => {
            return (
                <Col>
                    <QuizCard key={thisScore.quizId} quiz={thisScore.quizId} previousPage={"leaderboard"} />
                    <h5>{`Score: ${thisScore.score}`}</h5>
                    <h6>{`Taken on ${thisScore.date}`}</h6>
                </Col>
            )
        });
    };

    return (
        <div>
            <h4>Username: {username}</h4>
            <Button variant="outline-dark" onClick={quizToggle}>My Quizzes</Button>
            {quizClick ? seeMyQuizzes() : null}
            <Button variant="outline-dark" onClick={scoreToggle}>My Scores</Button>
            {scoreClick ? seeMyScores() : null}
        </div>
    );
};

export default AuthHOC(MyAccount);