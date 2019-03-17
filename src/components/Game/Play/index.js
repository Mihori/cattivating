import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pictures from '../Pictures';
import Button from '../../Button';
import Loading from '../../Loading';
import FinalScore from '../FinalScore';
import Score from '../Score';

import API_KEY from '../../../services';

const style = {
  white: {
    color: 'white',
  },
  background: {
    backgroundColor: '#360d49',
    height: '100%',
  }
}

const Play = (props) => {
  const cats = props.cats;
  const [round, setRound] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [rightCat, setRightCat] = useState('');
  const [wrongCat1, setWrongCat1] = useState('');
  const [wrongCat2, setWrongCat2] = useState('');
  const [answers, setAnswers] = useState([rightCat, wrongCat1, wrongCat2]);
  const [answered, setAnswered] = useState(false);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(function(){});

  useEffect(() =>  {
    newGame();
    newRound();    
  }, []);

  const newGame = () => {
    setRound(0);
    setRightAnswers(0);
    setWrongAnswers(0);
    setMessage(0);
  }

  const newRound = () => {
    setRound(round + 1);
    setPictures([]);
    setAnswered(false);
    setMessage('');

    populateAnswers();

    setTimer(setTimeout(() => {
      verifyAnswer('timeout');
    }, 10000));
  }
  
  const getPicture = async (type) => {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${type}`, {
      headers: {
        'x-api-key': API_KEY,
      }
    });
    const picture = await response.data[0].url;

      return picture;
  }

  const getPictures = (type) => {
    Promise.all([getPicture(type), getPicture(type), getPicture(type)])
      .then(pictures => setPictures(pictures))
  }

  const getRandomCat = () => {
    return cats[Math.floor(Math.random() * cats.length)];
  }
  
  const populateAnswers = () => {
    let right = getRandomCat();
    let wrong1 = getRandomCat();
    let wrong2 = getRandomCat();
    
    getPictures(right.id);
    
    while (wrong1 === right) {
      wrong1 = getRandomCat();
    }
    while (wrong2 === right || wrong2 === wrong1) {
      wrong2 = getRandomCat();
    }

    setRightCat(right);
    setWrongCat1(wrong1);
    setWrongCat2(wrong2);
    setAnswers(shuffle([right.name, wrong1.name, wrong2.name]));
  }
  
  
  const verifyAnswer = (answer) => {
    setAnswered(true);
    setTimer(clearTimeout(timer));

    if (answer === rightCat.name) {
        setRightAnswers(rightAnswers + 1);
        setMessage('That\'s correct!');
    } else {
        setWrongAnswers(wrongAnswers + 1);
        setMessage('Unfortunately your answer is wrong!');
    }
    
    if (answer === 'timeout') {
      setMessage('Time\'s up! Speed up your cat reflexes!');
    }
    
    if (round === 5) {
      setRound(round + 1);
    }
  }

  const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  
  return (
    <div>
      {
      round > 5 ? <FinalScore rightAnswers={rightAnswers} round={round} newGame={newGame}/> :

      pictures.length > 0 ? (<div style={style.background}>
      <Score rightAnswers={rightAnswers} wrongAnswers={wrongAnswers} round={round} />
      { !answered ? (<div style={style.background}>
      <h3 style={style.white}>What type of cat is on the pictures? You have 10 seconds to choose!</h3>
      <Pictures firstUrl={pictures[0]} secondUrl={pictures[1]} thirdUrl={pictures[2]} /> <br/>
      <Button onclick={() => verifyAnswer(answers[0])} text={answers[0]}/>
      <Button onclick={() => verifyAnswer(answers[1])} text={answers[1]}/>
      <Button onclick={() => verifyAnswer(answers[2])} text={answers[2]}/> </div>)
      : <div> {message.length > 0 && <h2 style={style.white}>{message}</h2>}
      <Button onclick={newRound} text='Next Question' /></div> }
      </div>) 
      : <Loading />
      }
    </div>
  )
}

export default Play;
