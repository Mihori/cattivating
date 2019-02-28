import React, { Component } from 'react';
import Radium from 'radium';

const style = {
  generic: {
    color: 'white',
    backgroundColor: '#360d49',
    height: '100%',
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    marginBottom: '5px',
    marginRight: '5px',
    width: '90px',
    height: '45px',
    fontSize: '14px',
    verticalAlign: 'top',
    backgroundColor: '#1b0624',
    color: 'white',
    border: 'none',
    ':hover': {
      cursor: 'pointer',
    },
    ':focus': {
      outline: 'none',
      border: 'none',
      color: '#c914b9',
      fontSize: '16px',
    },
  },
  desc: {
    width: '75%',
    margin: 'auto',
  },
  a: {
    textDecoration: 'none',
    color: 'white',
  }
}

class Learn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: props.cats,
      data: '',
    }
  }

  setData = (cat) => {
    this.setState({ data: cat });
  }

  render() {
    return (
  <div style={style.generic}>
    <h2>This section is under construction! Please come back later.</h2>
    <h3>Choose one type for more information.</h3>
    <div style={style.buttons}>
      {this.state.cats.map(cat => 
      <button onClick={this.setData.bind(this, cat)}
              style={style.button} 
              key={cat.id}>
              {cat.name}
      </button>)}
    </div>
    {this.state.data && (
    <div style={{ backgroundColor: '#360d49' }}>
      <h2>{this.state.data.name}</h2>
      <h3>Origin: {this.state.data.info.origin}</h3>
      <h3>Temper: {this.state.data.info.temper}</h3>
      <h5 style={style.desc}>{this.state.data.info.desc}</h5>
      <h3><a style={style.a} href={this.state.data.info.wiki}>Wish to know more? Click on me!</a></h3>
    </div>
    )}
  </div>
    )
  }
}

export default Radium(Learn);
