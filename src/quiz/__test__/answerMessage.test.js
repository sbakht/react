import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AnswerMessage from '../answerMessage';
import toJSON from 'enzyme-to-json';

test('render correct', () => {
  var answer = {isCorrect : true} 
  var component = shallow(<AnswerMessage answer={answer} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('render incorrect', () => {
  var answer = {isWrong : true} 
  var component = shallow(<AnswerMessage answer={answer} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('has proptypes', () => {
  expect(AnswerMessage.propTypes).toBeDefined();
  
  Object.keys(AnswerMessage.propTypes).map((key) => {
    expect(AnswerMessage.propTypes[key]).toBeDefined();
  });
});