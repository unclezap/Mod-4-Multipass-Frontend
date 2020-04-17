import React from 'react';
import NewAnswers from './NewAnswers';

const NewQuestions = (props) => {
    
    function handleClick(e, questionId) {
        e.preventDefault()
        props.addAnswer(questionId)
    }
    
    return(
        props.questions.map((val) => {

            return (
                <div key={val.id} className="question">
                    <label htmlFor="question">Question</label>
                    <input id={val.id} type="text" name="question" />
                <NewAnswers answers={val.answers} qid={val.id}/>
                <button onClick={(e) => handleClick(e, val.id)}>Add another answer</button>
                </div>
            )
        })
    )
}

export default NewQuestions;