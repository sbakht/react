import React from "react";
import PropTypes from 'prop-types';

const Choice = props => {
  const onAnswer = () => {
    onClick(choice);
  };

  const getClass = () => {
    var arr = ["choice"];
    isSelected ? arr.push("selected") : "";
    return arr.join(" ");
  };

  const { choice, isSelected, onClick } = props;

  return (
    <label className={getClass()}>
      <input
        type="radio"
        name="choices"
        onClick={onAnswer}
        checked={isSelected}
      />
      {choice.text}
    </label>
  );
};

Choice.propTypes = {
  choice: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
};

export default Choice;
