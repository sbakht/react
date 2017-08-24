import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Results from '../results';
import toJSON from 'enzyme-to-json';

test('render default', () => {
  const questions = Array(4).fill(1);
  const answers = [{ isCorrect: true }, { isCorrect: true }];
  const component = shallow(<Results questions={questions} answers={answers} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('has proptypes', () => {
  expect(Results.propTypes).toBeDefined();

  Object.keys(Results.propTypes).map((key) => {
    expect(Results.propTypes[key]).toBeDefined();
  });
});
