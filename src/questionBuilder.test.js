// Link.react-test.js
import React from 'react';
import QuestionBuilder from './QuestionBuilder';
import renderer from 'react-test-renderer';
import Util from './util';
import Choice from './quiz/choice';

test('Link changes the class when hovered', () => {
  Util.Root.getRandom = jest.fn();
  Util.Root.getRandom.mockReturnValue({
    root1: 'ك',
    root2: 'س',
    root3: 'ن',
    form: 2
  })
var out = new QuestionBuilder({
  text : "Which is the 3rd person masculine maadhi?",
  numQuestions : 1
});
  var question = out.maadhiQ(['past'], 'type1');
  expect(question).toMatchSnapshot();

});