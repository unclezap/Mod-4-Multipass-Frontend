import React from "react"
import QuizCard from './QuizCard'


function Browse(props) {

    function allQuizzes() {
        return props.allQuizzes.map((thisQuiz) => {
            return <QuizCard quiz={thisQuiz} />
        })
    }
    
    return (
        <div>
            {allQuizzes()}
        </div>
    )
}

export default Browse