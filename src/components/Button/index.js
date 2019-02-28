import React from 'react';
import Radium from 'radium';

const style = {
  marginLeft: '30px',
  marginRight: '30px',
  width: '150px',
  height: '85px',
  borderRadius: '50%',
  backgroundColor: '#1b0624',
  color: '#c914b9',
  fontSize: '25px',
  border: 'none',
  ':hover': {
    cursor: 'pointer',
  },
  ':focus': {
    outline: 'none',
    border: 'none',
  },
  verticalAlign: 'top',
}

const Button = (props) => (
  <button onClick={props.onclick} style={style}>{props.text}</button>
)

export default Radium(Button);
