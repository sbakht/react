import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Pager from '../pager';
import toJSON from 'enzyme-to-json';

test('render first page', () => {
  const fn = jest.fn();
  const component = shallow(<Pager qNum={1} qLen={2} onPrev={fn} onNext={fn} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('render last page', () => {
  const fn = jest.fn();
  const component = shallow(<Pager qNum={2} qLen={2} onPrev={fn} onNext={fn} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('render middle page', () => {
  const fn = jest.fn();
  const component = shallow(<Pager qNum={2} qLen={3} onPrev={fn} onNext={fn} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('on click prev page', () => {
  const fn = jest.fn();
  const prev = jest.fn();
  const component = shallow(<Pager qNum={2} qLen={3} onPrev={prev} onNext={fn} />);
  component.find('li a').at(0).simulate('click');
  expect(prev.mock.calls.length).toBe(1);
});

test('on click next page', () => {
  const fn = jest.fn();
  const next = jest.fn();
  const component = shallow(<Pager qNum={2} qLen={3} onPrev={fn} onNext={next} />);
  component.find('li a').at(1).simulate('click');
  expect(next.mock.calls.length).toBe(1);
});

test('has proptypes', () => {
  expect(Pager.propTypes).toBeDefined();

  Object.keys(Pager.propTypes).map((key) => {
    expect(Pager.propTypes[key]).toBeDefined();
  });
});
