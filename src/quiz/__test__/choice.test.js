import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Choice from '../choice';
import toJSON from 'enzyme-to-json';

test('renders default', () => {
  var choice = {};
  const component = shallow(
    <Choice choice={choice} />
  );

  expect(toJSON(component)).toMatchSnapshot();
  expect(component.hasClass('choice')).toBe(true);
});

test('renders selected choice', () => {
  var choice = {};
  const component = shallow(
    <Choice choice={choice} isSelected={true} />
  );

  expect(toJSON(component)).toMatchSnapshot();
  expect(component.hasClass('selected')).toBe(true);
});

test('choice text', () => {
  var choice = { text : 'choice#1'};
  const component = shallow(
    <Choice choice={choice} />
  );

  expect(toJSON(component)).toMatchSnapshot();
  expect(component.text()).toBe("choice#1");
});

test('calls parent on choice select with choice', () => {
  var fn = jest.fn();
  var choice = { text : 'choice#1'};
  const component = shallow(
    <Choice choice={choice} onClick={fn} />
  );

  component.find('input').simulate('click');
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0]).toEqual(choice);
});

test('has proptypes', () => {
  expect(Choice.propTypes).toBeDefined();
  
  Object.keys(Choice.propTypes).map((key) => {
    expect(Choice.propTypes[key]).toBeDefined();
  });
});