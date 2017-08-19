import React from "react";
import PropTypes from "prop-types";

const Results = props => {
  const { answers, questions } = props;
  const countCorrect = answers.filter(function(answer) {
    return answer.isCorrect;
  }).length;

  return (
    <div>
      Score: {countCorrect}/{questions.length}
    </div>
  );
};

Results.propTypes = {
	answers : PropTypes.array.isRequired,
	questions : PropTypes.array.isRequired
}

export default Results;
