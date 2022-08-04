import React from 'react';
import he from 'he';
import {nanoid} from 'nanoid';

export default function Question(props) {

    const answers = [props.correct_answer, ...props.incorrect_answers];

    const [randomizedAnswers, setRandomizedAnswers] = React.useState(randomizeAnswers());

    function randomizeAnswers() {
        const mixedAnswers = [];
        let answersAmount = answers.length;
    
        while(answersAmount--){
            let index = Math.floor(Math.random() * answersAmount);
            mixedAnswers.push(answers[index]);
            answers.splice(index, 1);
        }

        return mixedAnswers;
    }

    function siblings(el) {
        let siblings = [];
        let sibling = el.parentNode.firstElementChild;

        do{
            if(sibling != el){
                siblings.push(sibling);
            }
        } while (sibling = sibling.nextElementSibling);
        
        return siblings;
    }


    function selectAnswer(e) {
        // if(e.target.innerText === he.decode(props.correct_answer)){
        //     console.log("Correct!");
        // }
        
        siblings(e.target).map(sibling => {     
            sibling.classList.remove('selected-answer');
            sibling.classList.add('grayed-out-answer');
            e.target.classList.remove('grayed-out-answer')
            e.target.classList.add('selected-answer');
            }
        );
    }

    return(
        <div className="question-container">
            <h2>{he.decode(props.question)}</h2>
            <ul>
                {randomizedAnswers.map(answer => <li key={nanoid()} onClick={selectAnswer}>{he.decode(answer)}</li>) }
            </ul>
        </div>

    )
}