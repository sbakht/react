import React from "react";
import Choice from "./choice";
import AnswerMessage from "./answerMessage";

const QuizQuestion = props => {
  const allowDoOver = true;

  const onAnswer = choice => {
    if (notYetAnswered() || allowDoOver) {
      props.onAnswer(choice);
    }
  };

  const notYetAnswered = () => {
    return !Object.keys(props.answer).length;
  };

  const isSelected = choice => {
    return choice.val === props.answer.val;
  };

  const { question, answer } = props;

  return (
    <div>
      <h3 className="title">
        {question.text}
      </h3>
      {question.choices.map(function(choice) {
        const selected = isSelected(choice);
        return (
          <Choice isSelected={selected} choice={choice} onClick={onAnswer} key={choice.index} />
        );
      })}
      <AnswerMessage answer={answer} />
    </div>
  );
};

export default QuizQuestion;
