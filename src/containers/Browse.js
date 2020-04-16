import React from "react"
import QuizCard from '../components/QuizCard';
import { Container, Row, Col } from 'react-bootstrap';



function Browse(props) {

    function allQuizzes() {
        return props.allQuizzes.map((thisQuiz) => {
            return (<Col><QuizCard key={thisQuiz.id} quiz={thisQuiz} /></Col>)
        })
    }
    
    return (
        <Container fluid="md">
            <Row>
                {allQuizzes()}
            </Row>
        </Container>
    )
}

export default Browse