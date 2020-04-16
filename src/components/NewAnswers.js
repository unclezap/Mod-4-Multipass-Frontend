import React from 'react';

const NewAnswers = (props) => {

    return (
        props.answers.map((val) => {
            return (
                <div key={val.id} className="answer">
                    <label htmlFor="answer">Answer</label>
                    <input className={props.qid} id={val.id} type="text" name="answer" />
                    <input className={props.qid} id={val.id} type="checkbox" name="checkbox"/>
                    <label htmlFor="correct">Correct Answer?</label><br />
                </div>
            )
        })
    )
}

export default NewAnswers;