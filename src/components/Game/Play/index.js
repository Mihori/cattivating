import React, { Component } from 'react';

import Pictures from '../Pictures';
import Button from '../../Button'
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

class Play extends Component {
  constructor(props) {
    super();
    this.state = {
      round: 0,
      rightAnswers: 0,
      wrongAnswers: 0,
      cats: props.cats,
      pictures: [],
      rightCat: '',
      wrongCat1: '',
      wrongCat2: '',
      answered: false,
      message: '',
      timer: function(){}
    }
  }

  componentDidMount() {
    this.newGame();
    this.newRound();
  }

  newGame = () => {
    this.setState({ round: 0, rightAnswers: 0, wrongAnswers: 0, message: '' });
  }

  newRound = () => {
    this.setState({
      round: this.state.round + 1 ,
      picture1: '',
      picture2: '', picture3: '',
      answered: false,
      message: '',
    });

    this.populateAnswers();

    this.setState({
      timer: setTimeout(() => {
      this.verifyAnswer('timeout');
    }, 10000)
    });
  }
  
  getRandomCat = () => {
    return this.state.cats[Math.floor(Math.random() * 66)];
  }
  
  populateAnswers = () => {
    let rightCat = this.getRandomCat();
    let wrongCat1 = this.getRandomCat();
    let wrongCat2 = this.getRandomCat();
    this.setState({ pictures: [] });
    this.getPictures(rightCat.id);
    this.getPictures(rightCat.id);
    this.getPictures(rightCat.id);
    
    while (wrongCat1 === rightCat) {
      wrongCat1 = this.getRandomCat();
    }
    while (wrongCat2 === rightCat || wrongCat2 === wrongCat1) {
      wrongCat2 = this.getRandomCat();
    }
    
    this.setState({
      rightCat,
      wrongCat1,
      wrongCat2,
    })
  }
  
  getPictures = (type) => {
    fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${type}`, {
      headers: {
        'x-api-key': API_KEY,
      }  
    })
    .then(response => response.json())
    .then(result => result[0].url)
    .then(url => this.setState({ pictures: [...this.state.pictures, url] }));
  }
  
  verifyAnswer = (answer) => {
    this.setState({ answered: true, timer: clearTimeout(this.state.timer) });
    if (answer === this.state.rightCat.name) {
      this.setState({
        rightAnswers: this.state.rightAnswers + 1,
        message: 'That\'s correct!',
      });
    } else {
      this.setState({
        wrongAnswers: this.state.wrongAnswers + 1,
        message: 'Unfortunately your answer is wrong!',
      });
      
    }
    
    if (answer === 'timeout') {
      this.setState({ message: 'Time\'s up! Speed up your cat reflexes!'})
    }
    
    if (this.state.round === 5) {
      this.setState({ round: this.state.round + 1 });
    }
  }

  shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  
  render() {
    const { rightAnswers, wrongAnswers, round, pictures, rightCat, wrongCat1, wrongCat2, answered, message } = this.state;
    const answers = this.shuffle([rightCat.name, wrongCat1.name, wrongCat2.name]);
  
      return (
        <div>
          {
          this.state.round > 5 ? <FinalScore rightAnswers={rightAnswers} round={round} newGame={this.newGame.bind(this)}/> :

          pictures.length > 0 ? (<div style={style.background}>
          <Score rightAnswers={rightAnswers} wrongAnswers={wrongAnswers} round={round} />
          { !answered ? (<div style={style.background}>
          <h3 style={style.white}>What type of cat is on the pictures? You have 10 seconds to choose!</h3>
          <Pictures firstUrl={pictures[0]} secondUrl={pictures[1]} thirdUrl={pictures[2]} /> <br/>
          <Button onclick={this.verifyAnswer.bind(this, answers[0])} text={answers[0]}/>
          <Button onclick={this.verifyAnswer.bind(this, answers[1])} text={answers[1]}/>
          <Button onclick={this.verifyAnswer.bind(this, answers[2])} text={answers[2]}/> </div>)
          : <div> {message.length > 0 && <h2 style={style.white}>{message}</h2>}
          <Button onclick={this.newRound.bind(this)} text='Next Question' /></div> }
          </div>) 
          : <Loading />
          }
        </div>
      )
  }
}

export default Play;
