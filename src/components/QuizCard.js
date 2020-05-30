import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';



const QuizCard = (props) => {
    const {title, description, category, id} = props.quiz

    return (

        <Card style={props.styleProps} className="text-center">
            <Card.Title>{title}</Card.Title>
            <Card.Text >{description}</Card.Text>
            <Card.Subtitle className="text-muted">Category: {category}</Card.Subtitle>
            <Link to={`/${props.previousPage}/${id}`} className="btn btn-outline-dark">{props.previousPage === "quizzes" ? "Take Quiz" : "See Score"}</Link>
        </Card>
    )
}

export default QuizCard;