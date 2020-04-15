import React from "react"
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'


function QuizCard(props) {

    const {title, description, category, id} = props.quiz

    return (

        //note: fix the link for heroku functionality
        <Card style={{ width: '18rem' }}>
            <h2><Link to={`/quizzes/${id}`}>{title}</Link></h2>
            <h4>{description}</h4>
            <h5>{category}</h5>
        </Card>
    )
}

export default QuizCard;