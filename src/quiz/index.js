import React from 'react';
import QuizQuestion from './quizQuestion';
import Pager from './pager';
import css from './style.css';
import Results from './results';
import PropTypes from 'prop-types';

class Quiz extends React.Component {
  constructor() {
    super();
    this.state = { answers: [], index: 0, showResults: false };
  }
  getActiveQuestion() {
    return this.props.questions[this.state.index];
  }
  getActiveAnswer() {
    return this.state.answers[this.state.index] || {};
  }
  onAnswer(choice) {
    const answers = Object.assign([], this.state.answers);
    answers[this.state.index] = choice;
    this.setState({ answers });
  }
  nextQuestion() {
    this.setState({ index: this.state.index + 1 });
  }
  prevQuestion() {
    this.setState({ index: this.state.index - 1 });
  }
  showResults() {
    this.setState({ showResults: true });
  }
  handleKeyPress(e) {
    var choices = this.getActiveQuestion().choices;
    if(e.keyCode === 13) {
      if(this.state.index < this.props.questions.length - 1) {
        this.nextQuestion();
      }else if(!this.state.showResults){
        this.showResults();
      }
    }else if(e.keyCode >= 49 && e.keyCode < 49 + choices.length ) {
      this.onAnswer(choices[e.keyCode - 49]);
    }
  }
  componentWillMount() {
    //fix this to use form
    document.addEventListener("keydown", this.handleKeyPress.bind(this))
  }
  componentWillUnmount() {
    //fix this to use form
    document.removeEventListener("keydown", this.handleKeyPress.bind(this))
  }
  render() {
    return (
      <div className="quiz">
        {!this.state.showResults &&
          <div>
            <div>
              <p>Question {this.state.index + 1} of {this.props.questions.length}</p>
              <QuizQuestion
                question={this.getActiveQuestion()}
                answer={this.getActiveAnswer()}
                onAnswer={this.onAnswer.bind(this)}
                allowDoOver
              />
            </div>
            <div>
              <Pager
                onPrev={this.prevQuestion.bind(this)}
                onNext={this.nextQuestion.bind(this)}
                qNum={this.state.index + 1}
                qLen={this.props.questions.length}
                showResults={this.showResults.bind(this)}
              />
            </div>
          </div>}
        {this.state.showResults &&
          <Results
            answers={this.state.answers}
            questions={this.props.questions}
          />}
      </div>
    );
  }
}

Quiz.propTypes = {
  questions: PropTypes.array,
};

export default Quiz;
