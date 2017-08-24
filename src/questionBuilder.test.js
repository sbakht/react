// Link.react-test.js
import React from 'react';
import {QuestionBuilder, MaadhiQuestion} from './QuestionBuilder';
import Util from './util';

test('Link changes the class when hovered', () => {
  Util.Root.getRandom = jest.fn();
  Util.Root.getRandom.mockReturnValue({
    root1: 'ك',
    root2: 'س',
    root3: 'ن',
    form: 2,
  });

  const question = new MaadhiQuestion({
    text: 'Which is the 3rd person masculine maadhi?',
    pick: ['past'],
    type: 'type1'
  });

  expect(question.question).toMatchSnapshot();
});
