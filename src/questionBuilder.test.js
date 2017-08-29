// Link.react-test.js
import React from 'react';
import {QuestionBuilder, MaadhiQuestion, TableQuestion, Picker} from './QuestionBuilder';
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
     var Picker = {
        i : 0,
        call : function() {
            return this.i++;
        }
     }
  var table = new TableQuestion(options, Picker);
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});

test('build simple passive maadhi table question', () => {
  _.sample = jest.fn();
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "maadhi", type : "type1", choose : 0, voice: "passive"}
     var Picker = {
        i : 0,
        call : function() {
            return this.i++;
        }
     }
  var table = new TableQuestion(options, Picker);
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});


test('build simple active mudari table question', () => {
  _.sample = jest.fn();
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "mudari", type : "type1", choose : 0}
     var Picker = {
        i : 0,
        call : function() {
            return this.i++;
        }
     }
  var table = new TableQuestion(options, Picker);
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});

test('build simple passive mudari table question', () => {
  _.sample = jest.fn();
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "mudari", type : "type1", choose : 0, voice: "passive"}
     var Picker = {
        i : 0,
        call : function() {
            return this.i++;
        }
     }
  var table = new TableQuestion(options, Picker);
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});

test('build simple active maadhi table question - allows active/passive as wrong choices', () => {
  _.sample = jest.fn();
  //TODO: allow choose to use strings?
  var options = { letters : "فعل", group : "maadhi", type : "type1", choose : 0, include : ['active','passive']}
     var Picker = {
        i : 0,
        call : function() {
            return this.i++;
        }
     }
  var table = new TableQuestion(options, Picker);
  table.build(options);
  expect(table.question).toMatchSnapshot(); 
});

//need to account for repeat
test('sampleR', () => {
  var options = { letters : "فعل", group : "maadhi", type : "type1", voice: "active"}
  var picker = new Picker();
  var table = new TableQuestion(options, '', picker);
  expect(table.table.words.active.length).toBe(14)
  table.sampleR('active', 1);
  expect(table.table.words.active.length).toBe(13)
  table.sampleR('active', 1);
  expect(table.table.words.active.length).toBe(12)
});

test('sampleR repeat', () => {
  var options = { letters : "فعل", group : "maadhi", type : "type1", voice: "active"}
     var Picker = {
        i : 7,
        call : function() {
            return this.i++;
        }
     }
  var table = new TableQuestion(options, Picker);
  expect(table.table.words.active.length).toBe(14)
  table.sampleR('active', 1);
  expect(table.table.words.active.length).toBe(12)
});
