import React from "react"

function QuizCard(props) {

    const {title, description, category, id} = props.quiz

    return (

        //note: fix the link for heroku functionality
        <div>
            <h2><a href={`http://localhost:3000/quiz/${id}`}>{title}</a></h2>
            <h4>{description}</h4>
            {/* {quiz questions} */}
            <h5>{category}</h5>
        </div>
    )
}

export default QuizCard