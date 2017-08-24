import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';

const AnswerMessage = (props) => {
  const { isCorrect, isWrong } = props.answer;

  const getStyle = () => {
    const style = {
      fontWeight: 'bold',
      correct: {
        color: 'green',
      },
      wrong: {
        color: 'red',
      },
    };
    return _.extend({}, style, isCorrect ? style.correct : style.wrong);
  };

  return (
    <div className="answerMsg">
      {isCorrect &&
        <div className="success" style={getStyle()}>
          Correct
        </div>}
      {isWrong &&
        <div className="warning" style={getStyle()}>
          Incorrect
        </div>}
    </div>
  );
};

AnswerMessage.propTypes = {
  answer: PropTypes.shape({
    isCorrect: PropTypes.bool,
    isWrong: PropTypes.bool,
  }).isRequired,
};

export default AnswerMessage;
