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

    console.log(questionsData)

    let questions = [];

    if(questionsData !== null){
        questions = questionsData.map(question => {
            return (
                <Question key={nanoid()} {...question} />  
            )
        })
    }

    return(
        <div className="questions-container" >
           { questionsData !== null? questions : <h1>Waiting...</h1>}
        </div>
    )
} 