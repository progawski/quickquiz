import React from 'react';

export default function Home(props) {
    return(
        <div className="home-container">
            <h1>Quick Quiz</h1>
            <p>Check your general knowledge with 5 random questions</p>
            <button className="button" onClick={props.startNewGame}>Start quiz</button>
        </div>
    )
}