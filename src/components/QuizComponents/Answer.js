import React from 'react';

function Answer(props) {
    const {answer} = props.answer
    
    return(
        <div>
            <input type="radio" id={answer} name="answer" value={answer} />
            <label htmlFor={answer}>{answer}</label>
        </div>
    )
}

export default Answer;