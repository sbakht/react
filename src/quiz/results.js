import React from 'react';
import PropTypes from 'prop-types';

const Results = (props) => {
  const { answers, questions } = props;
  const countCorrect = answers.filter(answer => answer.isCorrect).length;

  const columns = questions.map((question, i) => <p key={i}>Question #{i + 1}: {answers[i] && answers[i].isCorrect ? 'Correct' : 'Incorrect'}</p>);

  return (
    <div>
      Score: {countCorrect}/{questions.length}
      <div>{columns}</div>
    </div>
  );
};

Results.propTypes = {
  answers: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
};

export default Results;
