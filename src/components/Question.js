import { nanoid } from 'nanoid';
import React from 'react';
import Answer from './Answer';


export default function Question(props) {

    const [answers, setAnswers] = React.useState(props.answers);
    const [correctAnswer, setCorrectAnswer] = React.useState(false);

    React.useEffect(() => {
        answers.some(answer => answer.isSelected && answer.isCorrect)? setCorrectAnswer(true) : setCorrectAnswer(false);
    }, [answers])

    React.useEffect(() => checkAnswer(), [correctAnswer])

    function checkAnswer() {
        props.checkResult(correctAnswer)
    }

    const answerElements = answers.map(answer => {
        return (
            <Answer
                key = {nanoid()}
                {...answer}
                selectAnswer = {() => selectAnswer(answer.id)}
                gameover = {props.gameover}
            />
        )
    })

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