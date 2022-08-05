import { nanoid } from 'nanoid';
import React from 'react';
import Answer from './Answer';


export default function Question(props) {

    const answerElements = props.answers.map(answer => {
        return (
            <Answer
                key = {nanoid()}
                {...answer}
            />
        )
    })
    

    return(
        <div className="question-container">
            <h2>{props.question}</h2>
            <ul>
              {answerElements}
            </ul>
        </div>
    )
}