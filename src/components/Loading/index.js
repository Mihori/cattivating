import React from 'react';

const style = {
  generic: {
    marginTop: '75px',
  },
  white: {
    color: 'white',
  }
}

const Loading = () => (
  <div style={style.generic}>
    <img src={require('../../images/catinc.png')} alt='Incoming cat' height='250px' />
    <h1 style={style.white}>LOADING</h1>
  </div>
)

export default Loading;
