import React from 'react';

export default function Answer(props) {

    let style;

    const selectedStyle = {
        borderColor: '#d4e395',
        backgroundColor: '#d4e395'
    }

    const correctStyle = {
        border: 'none',
        backgroundColor: '#b6dc1a',
        color: '#7e9033',
        opacity: props.isSelected? '1' : '0.5'
    }

    const incorrectStyle = {
        border: 'none',
        borderColor: '#d4e395',
        backgroundColor: '#e39595',
        color: '#ffffff'
    }

    // Set the proper style
    if(props.isSelected){
        if(props.gameover){
            props.isCorrect? style = correctStyle : style = incorrectStyle;
        } else {
            style = selectedStyle;
        }
    } else if(props.gameover && props.isCorrect){
        style = correctStyle;
    }
    

    return(
        <li onClick={props.selectAnswer} style={style} className={props.gameover? 'disabled' : 'enabled'}>{props.answer}</li>
    )
}