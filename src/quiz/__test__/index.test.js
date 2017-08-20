import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Quiz from '../index';
import toJSON from 'enzyme-to-json';

const questions = [
  {
    text: "Who is an adc?",
    choices: [
      { val: "a", text: "riven", isWrong: true },
      { val: "b", text: "zed", isWrong: true },
      { val: "c", text: "kogmaw", isCorrect: true },
      { val: "d", text: "janna", isWrong: true }
    ]
  },
  {
    text: "Who is a mid?",
    choices: [
      { val: "a", text: "riven", isWrong: true },
      { val: "b", text: "zed", isCorrect: true },
      { val: "c", text: "kogmaw", isWrong: true },
      { val: "d", text: "janna", isWrong: true }
    ]
  }
];

test('render question', () => {
  var component = shallow(<Quiz questions={questions}  />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('render results', () => {
  var component = shallow(<Quiz questions={questions}  />);
  component.instance().showResults();
  component.update();
  expect(toJSON(component)).toMatchSnapshot();
});

test('change question', () => {
  var component = shallow(<Quiz questions={questions}  />);
  component.instance().nextQuestion();
  component.update();
  expect(toJSON(component)).toMatchSnapshot();

  component.instance().prevQuestion();
  component.update();
  expect(toJSON(component)).toMatchSnapshot();
});

test('update answers', () => {
  var component = shallow(<Quiz questions={questions}  />);
  component.instance().onAnswer(questions[0].choices[1])
  component.update();
  expect(toJSON(component)).toMatchSnapshot();
});

test('change question -> update answers', () => {
  var component = shallow(<Quiz questions={questions}  />);
  component.instance().nextQuestion();
  component.update();
  expect(toJSON(component)).toMatchSnapshot();

  component.instance().onAnswer(questions[1].choices[0])
  component.update();
  expect(toJSON(component)).toMatchSnapshot();
});

test('has proptypes', () => {
  expect(Quiz.propTypes).toBeDefined();
  
  Object.keys(Quiz.propTypes).map((key) => {
    expect(Quiz.propTypes[key]).toBeDefined();
  });
});