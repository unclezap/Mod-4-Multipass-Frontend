import React from "react"
import QuizCard from '../components/QuizCard';
import { Container, Row, Col } from 'react-bootstrap';

const allQuizzes = (props) => {

    return props.allQuizzes.map((thisQuiz) => {
            return (<Col><QuizCard key={thisQuiz.id} quiz={thisQuiz} previousPage={"quizzes"} styleProps={props.styleProps}/></Col>)
    })
}

const Browse = (props) => {
    return (
        <Container fluid="md">
            <Row>
                {allQuizzes(props)}
            </Row>
        </Container>
    )
}

export default Browse