import React from "react";

const Results = props => {
  const countCorrect = props.answers.filter(function(answer) {
    return answer.isCorrect;
  }).length;

  return (
    <div>
      Score: {countCorrect}/{props.questions.length}
    </div>
  );
};

export default Results;
