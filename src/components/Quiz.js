import React from 'react';
import {API} from '../API';


function Quiz(props) {
    function makeQuiz(props) {
        API.getQuestions()
    }
    return (
        <div>
            {makeQuiz}
        </div>
    )
}

export default Quiz;