import React from 'react';
import Choice from './choice';
import AnswerMessage from './answerMessage';
import PropTypes from 'prop-types';

const QuizQuestion = (props) => {
  const onAnswer = (choice) => {
    if (notYetAnswered() || allowDoOver) {
      props.onAnswer(choice);
    }
  };

  const notYetAnswered = () => !Object.keys(props.answer).length;

  const isSelected = choice => choice.val === answer.val;

  const { question, answer, allowDoOver } = props;

  return (
    <div>
      <h3 className="title">
        {question.text}
      </h3>
      {question.choices.map((choice, i) => {
        const selected = isSelected(choice);
        return (
          <Choice isSelected={selected} choice={choice} onClick={onAnswer} ith={i+1} key={i} />
        );
      })}
      <AnswerMessage answer={answer} />
    </div>
  );
};

QuizQuestion.propTypes = {
  question: PropTypes.shape({
    text: PropTypes.string.isRequired,
    choices: PropTypes.array.isRequired,
  }).isRequired,
  answer: PropTypes.shape({
    isCorrect: PropTypes.bool,
    isWrong: PropTypes.bool,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  allowDoOver: PropTypes.bool,
};

export default QuizQuestion;
