import React from "react";

const Question = props => {
  const { text } = props;
  return (
    <p>{text}</p>
  );
}

Question.propTypes = {
  text : React.PropTypes.string
};

export default Question;