import React from "react"
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'


function QuizCard(props) {

    const {title, description, category, id} = props.quiz

    return (

        //note: fix the link for heroku functionality
        <Card style={{ width: '18rem' }}>
            <Card.Title><Link to={`/quizzes/${id}`}>{title}</Link></Card.Title>
            <Card.Subtitle>{description}</Card.Subtitle>
            <footer>{category}</footer>
        </Card>
    )
}

export default QuizCard;