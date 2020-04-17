import React from 'react';

function Answer(props) {
    const {answer, id} = props.answer
    
    return(
        <div>
            <input type="radio" onChange={(e) => props.handleCheck(e.target.value)} id={id} name="answer" value={answer} />
            <label htmlFor={answer}>{answer}</label>
        </div>
    )
}

export default Answer;