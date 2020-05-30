import React from "react"
import QuizCard from '../components/QuizCard'
import { Container, Row, Col } from 'react-bootstrap';

function Leaderboard(props) {

    function allQuizzes() {
        // console.log(props.match, "YO!")
        // if (props.match.isExact) {
            return props.allQuizzes.map((thisQuiz) => {
                return (<Col><QuizCard key={thisQuiz.id} quiz={thisQuiz} previousPage={"leaderboard"}/></Col>)
            })
        //  } 
    }
    
    return (
        <Container fluid="md">
            <h2>Click on a quiz to see high scores!</h2>
            <Row>
                {allQuizzes()}
            </Row>
        </Container>
    )
}

export default Leaderboard