// Link.react-test.js
import React from 'react';
import {QuestionBuilder, MaadhiQuestion, TableQuestion} from './QuestionBuilder';
import Util from './util';
import _ from 'underscore';

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


test('build simple active maadhi table question', () => {
  _.sample = jest.fn();
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "maadhi", type : "type1", choose : 0}
  var table = new TableQuestion(options);
  _.sample.mockReturnValueOnce([table.table.words.active[1]])
          .mockReturnValueOnce([table.table.words.active[2]])
          .mockReturnValueOnce([table.table.words.active[3]])
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});

test('build simple passive maadhi table question', () => {
  _.sample = jest.fn();
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "maadhi", type : "type1", choose : 0, voice: "passive"}
  var table = new TableQuestion(options);
  _.sample.mockReturnValueOnce([table.table.words.passive[1]])
          .mockReturnValueOnce([table.table.words.passive[2]])
          .mockReturnValueOnce([table.table.words.passive[3]])
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});


test('build simple active mudari table question', () => {
  _.sample = jest.fn();
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "mudari", type : "type1", choose : 0}
  var table = new TableQuestion(options);
  _.sample.mockReturnValueOnce([table.table.words.active[1]])
          .mockReturnValueOnce([table.table.words.active[2]])
          .mockReturnValueOnce([table.table.words.active[3]])
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});

test('build simple passive mudari table question', () => {
  _.sample = jest.fn();
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "mudari", type : "type1", choose : 0, voice: "passive"}
  var table = new TableQuestion(options);
  _.sample.mockReturnValueOnce([table.table.words.passive[1]])
          .mockReturnValueOnce([table.table.words.passive[2]])
          .mockReturnValueOnce([table.table.words.passive[3]])
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});

test('build simple active maadhi table question - allows active/passive as wrong choices', () => {
  _.sample = jest.fn();
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "maadhi", type : "type1", choose : 0, include : ['active','passive']}
  var table = new TableQuestion(options);
  _.sample.mockReturnValueOnce([table.table.words.active[1]])
          .mockReturnValueOnce([table.table.words.active[2]])
          .mockReturnValueOnce([table.table.words.active[3]])
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});