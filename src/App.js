import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const App = () => {
const [route, setRoute] = useState('home');
const [cats, setCats] = useState([]);

useEffect(() => {
  
(async () => {  
  const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': API_KEY,
      }
    });

  const cats = await response.data.map(breed => {
    return { 
      name: breed.name,
      id: breed.id,
      info: {
        desc: breed.description,
        origin: breed.origin,
        temper: breed.temperament,
        wiki: breed.wikipedia_url,
      }
    }});
    setCats(cats);
  })()}, []);
  
  const routeChange = (destination) => {
    setRoute(destination);
  }
  
    return (
      <div className='App'>
        <Header
          play={routeChange.bind(null, 'play')}
          home={routeChange.bind(null, 'home')}
          learn={routeChange.bind(null, 'learn')}
          />
        <ErrorBoundary>
          {route === 'home' &&
          <div style={style.home}>
            <h1>Welcome to Cattivating!</h1>
            <Button onclick={routeChange.bind(null, 'play')} text='Play' />
            <Button onclick={routeChange.bind(null, 'learn')} text='Learn' />
          </div>
          }

          {route === 'play' &&
            cats.length > 0 &&
            <Play cats={cats} />
          }

          {route === 'learn' &&
            cats.length > 0 &&
            <Learn cats={cats} />
          }
        </ErrorBoundary>
      </div>
    );
}

export default App;
