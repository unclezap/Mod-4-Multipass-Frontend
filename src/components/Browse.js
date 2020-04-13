import React from "react"
import QuizCard from './QuizCard'


function Browse(props) {

    function allQuizzes() {
        return props.allQuizzes.map((thisQuiz) => {
            return <QuizCard key={thisQuiz.id} quiz={thisQuiz} />
        })
    }
    
    return (
        <div>
            {allQuizzes()}
        </div>
    )
}

export default Browse