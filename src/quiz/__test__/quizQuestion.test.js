import React from 'react';
import { shallow, mount, render } from 'enzyme';
import QuizQuestion from '../QuizQuestion';
import toJSON from 'enzyme-to-json';

const choices = [
  { val: 'a', text: 'riven', isWrong: true },
  { val: 'b', text: 'zed', isWrong: true },
  { val: 'c', text: 'kogmaw', isCorrect: true },
  { val: 'd', text: 'janna', isWrong: true },
];

test('render before answer', () => {
  const question = { text: 'Question title', choices };
  const fn = jest.fn();
  const component = shallow(<QuizQuestion question={question} answer={{}} onAnswer={fn} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('render after answer', () => {
  const question = { text: 'Question title', choices };
  const answer = { val: 'a' };
  const fn = jest.fn();
  const component = shallow(<QuizQuestion question={question} answer={answer} onAnswer={fn} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('can select answer', () => {
  const question = { text: 'Question title', choices };
  const fn = jest.fn();
  const component = shallow(<QuizQuestion question={question} answer={{}} onAnswer={fn} />);
  component.find('Choice').at(0).simulate('click');
  expect(fn.mock.calls.length).toBe(1);
});

test('no answer do overs', () => {
  const question = { text: 'Question title', choices };
  const answer = { val: 'a' };
  const fn = jest.fn();
  const component = shallow(<QuizQuestion question={question} answer={answer} onAnswer={fn} />);
  component.find('Choice').at(1).simulate('click');
  expect(fn.mock.calls.length).toBe(0);
});

test('allow answer do overs', () => {
  const question = { text: 'Question title', choices };
  const answer = { val: 'a' };
  const fn = jest.fn();
  const component = shallow(<QuizQuestion question={question} answer={answer} onAnswer={fn} allowDoOver />);
  component.find('Choice').at(1).simulate('click');
  expect(fn.mock.calls.length).toBe(1);
});

test('has proptypes', () => {
  expect(QuizQuestion.propTypes).toBeDefined();

  Object.keys(QuizQuestion.propTypes).map((key) => {
    expect(QuizQuestion.propTypes[key]).toBeDefined();
  });
});
