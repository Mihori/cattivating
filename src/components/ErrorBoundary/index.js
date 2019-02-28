import React, { Component } from 'react';

const style = {
  generic: {
    color: 'white',
  },
  img: {
    height: '300px',
  }
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
      <div style={style.generic}>
        <h1>Oops! Some error has occured!</h1>
        <img style={style.img} src={require('../../images/errorcat.jpg')} alt='error' />
      </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary;