import React from 'react';
import Question from './Question';
import he from 'he';
import {nanoid} from 'nanoid';

export default function Game(props) {

    const [questionsData, setQuestionsData] = React.useState(null)
    const [result, setResult] = React.useState(0);
    const [gameover, setGameover] = React.useState(false);

    React.useEffect(() => {
        // Get questions from API, randomize them and assign to questionsData by settings its state
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuestionsData(randomizeQuestions(data.results)))
            .catch(err => console.log(err))   
    }, [])

    // Randomize questions in order to mix correct and incorrect answers
    function randomizeQuestions(data) {
        const questions = data.map(question => {
            // Prepare array of incorrect answers
            const answers = [...question.incorrect_answers].map(answer => {
                return {
                    id: nanoid(), // Create random id using nanoid generator
                    answer: he.decode(answer), // Decode HTML entities like &quot etc.
                    isCorrect: false,
                    isSelected: false
                }
            });
            // Push correct answer to answers array
            answers.push({
                id: nanoid(),
                answer: he.decode(question.correct_answer),
                isCorrect: true,
                isSelected: false
            })

            let mixedAnswers = answers;
            let currentIndex = answers.length;
            let randomIndex;

            // Randomize questions
            while (currentIndex !== 0){
                randomIndex = Math.floor(Math.random() * currentIndex); // Assign random index between 0 and current currentIndex value
                currentIndex--;
                
                /* 
                    Swap two array's elements basing on new randomized index.
                    [4, 2] = [2, 4];
                    [3, 1] = [1, 3];
                    ...
                */
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

    // Prepare Question component if questionsData is not null
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

    // Check ending result basing on selected answers
    function checkResult(answer) {
        if(answer){
            setResult(prevResult => prevResult + 1);
        } else if(!answer && result > 0){
            setResult(prevResult => prevResult - 1);
        }
    }

    // Finish the game and show result after button press
    function showResult() {
        setGameover(true);
    }

    return(
        <>
            {/* If questionsData is null show waiting text, otherwise show questions*/}
            {questionsData === null? <h1>Waiting</h1> :
            <>
                <div className="questions-container" >
                    {questionElements}
                </div>
                <div className="summary-container">
                    {/* If game is over show text with the result' and change button's text and functionality to start the game again*/}
                    {gameover && <div className="summary-text">You scored {result} correct answers</div>}
                    <button onClick={gameover? props.startNewGame : showResult} className="button">{gameover? 'Play again' : 'Check answers'}</button>
                </div>
            </>
            }
        </>
    )
} 