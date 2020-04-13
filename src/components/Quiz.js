import React from 'react';
import { api } from '../api';


function Quiz(props) {
    function makeQuiz(props) {
        api.quizzes.getQuestions(props.match.params.id).then(data =>
            console.log(data))
            //question data is received, need to render questions
            //need to serialize answers here
            //need to put answers and question in
    };

    return (
        <div>
            {makeQuiz(props)}
        </div>
    )
}

export default Quiz;