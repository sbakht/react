// Link.react-test.js
import React from 'react';
import QuestionBuilder from './QuestionBuilder';
import renderer from 'react-test-renderer';
import Util from './util';

test('Link changes the class when hovered', () => {
  Util.Root.getRandom = jest.fn();
  Util.Root.getRandom.mockReturnValue({
    root1: 'ك',
    root2: 'س',
    root3: 'ن',
    form: 2
  })

  var question = QuestionBuilder.maadhiQ(['past'], 'type1');
  expect(question).toMatchSnapshot();

});