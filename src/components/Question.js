import { nanoid } from 'nanoid';
import React from 'react';
import Answer from './Answer';


export default function Question(props) {

    const [answers, setAnswers] = React.useState(props.answers);
    const [correctAnswer, setCorrectAnswer] = React.useState(false);

    // Check if the answer is correct, everytime it is changed
    React.useEffect(() => {
        answers.some(answer => answer.isSelected && answer.isCorrect)? setCorrectAnswer(true) : setCorrectAnswer(false);
    }, [answers])

    // If the answer is correct, add score to the ending result
    React.useEffect(() => checkAnswer(), [correctAnswer])

    function checkAnswer() {
        props.checkResult(correctAnswer)
    }

    // Prepare Answer component
    const answerElements = answers.map(answer => {
        return (
            <Answer
                key = {nanoid()}
                {...answer}
                selectAnswer = {() => selectAnswer(answer.id)}
                gameover = {props.gameover} // Pass the gameover prop in order to estabilish proper style
            />
        )
    })

    // Change answer state depends on whether it is selected
    function selectAnswer(id) {
        setAnswers(prevAnswers => prevAnswers.map(answer => {
            return answer.id === id?
                {...answer, isSelected: true} :
                {...answer, isSelected: false}
        }))
    }

    return(
        <div className="question-container">
            <h2>{props.question}</h2>
            <ul>
              {answerElements}
            </ul>
        </div>
    )
}