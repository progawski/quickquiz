import React from 'react';
import he from 'he';

export default function Question(props) {

    const answers = [props.correct_answer, ...props.incorrect_answers];

    const [randomizedAnswers, setRandomizedAnswers] = React.useState(randomizeAnswers());

    // const [randomizedAnswers, setRandomizedAnswers] = React.useState(() => {
    //     const mixedAnswers = [];
    //     let answersAmount = answers.length;

    //     while(answersAmount--){
    //         let index = Math.floor(Math.random() * answersAmount);
    //         mixedAnswers.push(<li>{answers[index]}</li>);
    //         answers.splice(index, 1);
    //     }

    //     setRandomizedAnswers(mixedAnswers);
    // }, []); 

    function randomizeAnswers() {
        const mixedAnswers = [];
        let answersAmount = answers.length;
    
        while(answersAmount--){
            let index = Math.floor(Math.random() * answersAmount);
            mixedAnswers.push(answers[index]);
            answers.splice(index, 1);
        }
        
        console.log("State set!")

        return mixedAnswers;
    }



    return(
        <div className="question-container">
            <h2>{he.decode(props.question)}</h2>
            <ul>
                {randomizedAnswers.map(answer => <li>{he.decode(answer)}</li>) }
            </ul>
        </div>

    )
}