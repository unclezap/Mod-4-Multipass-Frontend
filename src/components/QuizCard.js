import React from "react"
import { Link } from "react-router-dom"


function QuizCard(props) {

    const {title, description, category, id} = props.quiz

    return (

        //note: fix the link for heroku functionality
        <div>
            <h2><Link to={`/quizzes/${id}`}>{title}</Link></h2>
            <h4>{description}</h4>
            {/* {quiz questions} */}
            <h5>{category}</h5>
        </div>
    )
}

export default QuizCard