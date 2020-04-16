import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';



function QuizCard(props) {
    const {title, description, category, id} = props.quiz

    return (

        //note: fix the link for heroku functionality
        <Card style={{ width: '18rem' }} className="text-center">
            <Card.Title>{title}</Card.Title>
            <Card.Text >{description}</Card.Text>
            <Card.Subtitle className="text-muted">Category: {category}</Card.Subtitle>
            <Link to={`/${props.previousPage}/${id}`} className="btn btn-outline-dark">Take Quiz</Link>
        </Card>
    )
}

export default QuizCard;