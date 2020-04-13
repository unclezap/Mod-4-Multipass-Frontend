import React from "react"
import QuizCard from './QuizCard'


function Browse(props) {

    function allQuizzes() {
        return props.quizzes.map((quiz) => {
            return <QuizCard props={quiz} />
        })
    }
    
    return (
        <div>
            {allQuizzes()}
        </div>
    )
}

export default Browse