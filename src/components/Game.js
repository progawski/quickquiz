import React from 'react';
import Question from './Question';
import he from 'he';
import {nanoid} from 'nanoid';

export default function Game(props) {

    const [questionsData, setQuestionsData] = React.useState(null)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuestionsData(data.results))
            .catch(err => console.log(err))

        
    }, [])

    let questions = [];

    if(questionsData !== null){
        questions = questionsData.map(question => {
            const answers = [...question.incorrect_answers].map(answer => {
                return {
                    id: nanoid(),
                    answer: he.decode(answer),
                    isCorrect: false
                }
            });

            answers.push({
                id: nanoid(),
                answer: he.decode(question.correct_answer),
                isCorrect: true
            })

            const mixedAnswers = [];
            let answersAmount = answers.length;

            while(answersAmount--){
                let index = Math.floor(Math.random() * answersAmount);
                mixedAnswers.push(answers[index]);
                answers.splice(index, 1);
            }

            return {
                id: nanoid(),
                question: he.decode(question.question),
                answers: mixedAnswers,
            }
        })
    }

    const questionElements = questions.map(question => {
        return (
            <Question
                key = {nanoid()}
                {...question}
            />
        )
    })

    return(
        <>
            {questionsData === null? <h1>Waiting</h1> :
            <>
                <div className="questions-container" >
                    {questionElements}
                </div>
                <div className="summary-container">
                    <div className="summary-text">You scored X correct answers</div>
                    <button className="button">Check answers</button>
                </div>
            </>
            }
        </>
    )
} 