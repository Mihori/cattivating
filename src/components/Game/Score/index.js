import React from 'react';

const style = {
  white: {
    color: 'white',
  }
}

const Score = (props) => (
  <div>
    <h2 style={style.white}>
      Right answers: {props.rightAnswers} | Question {props.round} / 5 | Wrong answers: {props.wrongAnswers}
    </h2>
  </div>
)

export default Score;
