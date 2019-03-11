import React from 'react';

const style = {
  marginBottom: '20px',
  img: {
    marginRight: '10px',
    height: '250px',
  }
}

const Pictures = (props) => {
  return (
  <div style={style}>
    <img style={style.img} src={props.firstUrl} alt='Cat' />
    <img style={style.img} src={props.secondUrl} alt='Cat' />
    <img style={style.img} src={props.thirdUrl} alt='Cat' />
  </div>
);
  }

export default Pictures;
