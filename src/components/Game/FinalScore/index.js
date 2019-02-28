import React from 'react';

import Button from '../../Button';

const style = {
  white: {
    color: 'white',
    marginTop: '100px'
  }
}

const FinalScore = (props) => {
  return (
    <div style={style.white}>
      <h1>Your final score is {props.rightAnswers} / {props.round - 1} !</h1>
      <Button onclick={props.newGame} text='New Game'/>
    </div>
  )
}

export default FinalScore;
