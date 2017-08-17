import React from "react";

const Score = props => {
  const { correct, incorrect } = props;
  return (
	<div id="score">
      <p>{correct}</p>
      <p>{incorrect}</p>
    </div>
  );
}

Score.propTypes = {
  correct : React.PropTypes.number,
  incorrect : React.PropTypes.number
};

export default Score;