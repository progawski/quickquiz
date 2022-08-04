import React from 'react';
import Question from './Question';
import {nanoid} from 'nanoid';

export default function Game(props) {

    const questionsAmount = 5;


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
            return (
                <Question key={nanoid()} {...question} />  
            )
        })
    }

    function checkAnswers() {
        
    }

    return(
        <>
            {questionsData === null? <h1>Waiting</h1> :
            <>
                <div className="questions-container" >
                    {questions}
                </div>
                <div className="summary-container">
                    <div className="summary-text">You scored X correct answers</div>
                    <button className="button" onClick={checkAnswers}>Check answers</button>
                </div>
                </>
            }
        </>
    )
} 