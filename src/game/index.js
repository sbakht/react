import React from 'react';
import Generator from '../generator';
import Util from '../util/index';
import css from './style.css';
import Question from './question';
import Choices from './choices';
import Score from './score';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      word: { type: '', text: '' },
      correct: 0,
      incorrect: 0,
    };
  }

  componentWillMount() {
    this.nextQuestion();
    const correct = Number(sessionStorage.getItem('correct')) || 0;
    const incorrect = Number(sessionStorage.getItem('incorrect')) || 0;
    const state = {};
    state.correct = correct;
    state.incorrect = incorrect;
    this.setState(state);
  }

  nextQuestion() {
    const roots = Util.Root.getRandom(3);
    const gen = Generator(roots, false);
    while (!gen[prop] || !gen[prop].length) {
      var prop = Util.randomProperty(gen); // clean this up
    }
    // console.log(gen, prop);
    this.setState({
      word: {
        type: prop,
        text: gen[prop],
      },
    });
  }

  onAnswerSubmit(wordType) {
    let c;
    const state = {};
    if (this.state.word.type === wordType) {
      c = 'correct';
    } else {
      c = 'incorrect';
    }
    state[c] = this.state[c] + 1;
    this.setState(state, this.saveSession);
    this.nextQuestion();
  }

  saveSession() {
    sessionStorage.setItem('correct', this.state.correct);
    sessionStorage.setItem('incorrect', this.state.incorrect);
  }

  render() {
    return (
      <div id="game">
        <Question text={this.state.word.text} />
        <Choices onSelect={this.onAnswerSubmit.bind(this)} />
        <Score correct={this.state.correct} incorrect={this.state.incorrect} />
      </div>
    );
  }
}

export default Game;
