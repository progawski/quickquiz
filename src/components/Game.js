import React from 'react';
import Question from './Question';
import he from 'he';
import {nanoid} from 'nanoid';

export default function Game(props) {

    const [questionsData, setQuestionsData] = React.useState(null)
    const [result, setResult] = React.useState(0);
    const [gameover, setGameover] = React.useState(false);

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuestionsData(randomizeQuestions(data.results)))
            .catch(err => console.log(err))   
    }, [])

    function randomizeQuestions(data) {
        const questions = data.map(question => {
            const answers = [...question.incorrect_answers].map(answer => {
                return {
                    id: nanoid(),
                    answer: he.decode(answer),
                    isCorrect: false,
                    isSelected: false
                }
            });

            answers.push({
                id: nanoid(),
                answer: he.decode(question.correct_answer),
                isCorrect: true,
                isSelected: false
            })

            let mixedAnswers = answers;
            let currentIndex = answers.length, randomIndex;

            while (currentIndex !== 0){
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [mixedAnswers[currentIndex], mixedAnswers[randomIndex]] = [mixedAnswers[randomIndex], mixedAnswers[currentIndex]];
            }

            return {
                id: nanoid(),
                question: he.decode(question.question),
                answers: mixedAnswers,
            }
        })
        return questions
    }

    const questionElements = questionsData?.map(question => {
        return (
            <Question
                {...question}
                key = {question.id}
                checkResult = {checkResult}
                gameover = {gameover}
            />
        )
    })

    function checkResult(answer) {
        if(answer){
            setResult(prevResult => prevResult + 1);
        } else if(!answer && result > 0){
            setResult(prevResult => prevResult - 1);
        }
    }

    function showResult() {
        setGameover(true);
    }

    return(
        <>
            {questionsData === null? <h1>Waiting</h1> :
            <>
                <div className="questions-container" >
                    {questionElements}
                </div>
                <div className="summary-container">
                    {gameover && <div className="summary-text">You scored {result} correct answers</div>}
                    <button onClick={gameover? props.startNewGame : showResult} className="button">{gameover? 'Play again' : 'Check answers'}</button>
                </div>
            </>
            }
        </>
    )
} 