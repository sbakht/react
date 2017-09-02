// Link.react-test.js
import React from 'react';
import { QuestionBuilder, MaadhiQuestion, TableQuestion } from './QuestionBuilder';
import { Picker } from './picker';
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
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "maadhi", type : "type1", choose : 0}
  var picker = new Picker({ correct: 0, wrong: [1,2,3]})
  var table = new TableQuestion(options, picker);
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});

test('build simple passive maadhi table question', () => {
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "maadhi", type : "type1", choose : 0, voice: "passive"}
  var table = new TableQuestion(options);
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});


test('build simple active mudari table question', () => {
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "mudari", type : "type1", choose : 0}
  var table = new TableQuestion(options);
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});

test('build simple passive mudari table question', () => {
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "mudari", type : "type1", choose : 0, voice: "passive"}
  var table = new TableQuestion(options);
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});

test('build simple active maadhi table question - allows active/passive as wrong choices', () => {
  //TODO: allow choose to use strings?
  //TODO include isnt changing test
  var options = { letters : "فعل", group : "maadhi", type : "type1", choose : 0, include : ['active','passive']}
  var table = new TableQuestion(options);
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});