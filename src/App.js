import React, { Component } from 'react';

import Header from './components/Header';
import Play from './components/Game/Play';
import Learn from './components/Learn';
import Button from './components/Button';
import ErrorBoundary from './components/ErrorBoundary';

import API_KEY from './services';

import './App.css';

const style = {
  home: {
    marginTop: '40px',
    color: 'white',
    fontSize: '25px'
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'home',
      cats: [],
    }
  }

  componentDidMount() {
    fetch('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': API_KEY,
      }
    })
    .then(response => response.json())
    .then(breeds => breeds.map(breed => { return { 
      name: breed.name,
      id: breed.id,
      info: {
        desc: breed.description,
        origin: breed.origin,
        temper: breed.temperament,
        wiki: breed.wikipedia_url,
      }, 
    } }))
    .then(cats => this.setState({ cats }))
    .catch(error => console.log(error));
  }
  
  routeChange = (route) => {
    this.setState({ route });
  }
  
  render() {
    return (
      <div className='App'>
        <Header
          play={this.routeChange.bind(this, 'play')}
          home={this.routeChange.bind(this, 'home')}
          learn={this.routeChange.bind(this, 'learn')}
          />
        <ErrorBoundary>
          {this.state.route === 'home' &&
          <div style={style.home}>
            <h1>Welcome to Cattivating!</h1>
            <Button onclick={this.routeChange.bind(this, 'play')} text='Play' />
            <Button onclick={this.routeChange.bind(this, 'learn')} text='Learn' />
          </div>
          }

          {this.state.route === 'play' &&
            this.state.cats.length > 0 &&
            <Play cats={this.state.cats} />
          }

          {this.state.route === 'learn' &&
            this.state.cats.length > 0 &&
            <Learn cats={this.state.cats} />
          }
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
