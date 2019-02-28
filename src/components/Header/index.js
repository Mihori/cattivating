import React from 'react';
import Radium from 'radium';

const style = {
  generic: {
    display: 'grid',
    gridTemplateColumns: '1fr repeat(3, auto) 1fr',
    gridColumnGap: '5px',
    justifyItems: 'center',
    alignItems: 'center',
    backgroundColor: '#1b0624',
    color: '#c914b9',
  },
  img: {
    gridColumnStart: 2,
    margin: '5px 0',
  },
  title: {
    margin: '0 5px',
  },
  highlight: {
    ':hover': {
      color: '#f53ae5',
      cursor: 'pointer',
    },
  }
}

const Header = (props) => (
<div style={style.generic}>
  <h2 style={style.highlight} key="play" onClick={props.play}>Play</h2>
  <img style={style.img} src={require('../../images/paw.png')} alt='logo' height='40px'/>
  <h1 style={style.highlight} key="home" onClick={props.home} >Cattivating</h1>
  <img src={require('../../images/paw.png')} alt='logo' height='40px'/>
  <h2 style={style.highlight} key="learn" onClick={props.learn}>Learn</h2>
</div>
)

export default Radium(Header);
