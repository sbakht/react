import React from "react";

const Choice = props => {
  const onAnswer = () => {
    console.log(choice);
    props.onClick(choice);
  };

  const getClass = () => {
    var arr = ["choice"];
    isSelected ? arr.push("selected") : "";
    return arr.join(" ");
  };

  const { choice, isSelected } = props;

  return (
    <label className={getClass()}>
      <input
        type="radio"
        onClick={onAnswer}
        onChange={onAnswer}
        data-value={choice.val}
        key={choice.index}
        value={choice.val}
        data-index={choice.index}
        checked={isSelected}
      />
      {choice.text}
    </label>
  );
};

export default Choice;
