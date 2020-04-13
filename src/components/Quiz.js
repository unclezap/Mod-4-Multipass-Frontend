import React from 'react';
import { api } from '../api';


function Quiz(props) {
    function makeQuiz(props) {
        // console.log(props)
        api.quizzes.getQuestions(props.match.params.id).then(data=> console.log(`Question data: ${data}`))
    };

    return (
        <div>
            {makeQuiz(props)}
        </div>
    )
}

export default Quiz;