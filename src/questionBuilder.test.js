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
  var table = new TableQuestion(options);
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

//need to account for repeat
test('sampleR', () => {
  // var options = { letters : "فعل", group : "maadhi", type : "type1", voice: "active"}
  // var table = new TableQuestion(options);
  // var picker = table.pickerClass;
  // expect(picker.table.active.length).toBe(14)
  // table.sampleR('active', 1);
  // expect(picker.table.active.length).toBe(13)
  // table.sampleR('active', 1);
  // expect(picker.table.active.length).toBe(12)
  // expect(table.table.words.active.length).toBe(14)
});




test('sampleR repeat', () => {
  // var options = { letters : "فعل", group : "maadhi", type : "type1", voice: "active"}
  //    // var Picker = {
  //    //     init: function(active) {
  //    //        this.words = active;
  //    //        this.i = -1;
  //    //     },
  //    //    i : 7,
  //    //    call : function() {
  //    //        return this.i++;
  //    //    }
  //    // }
  //    class MyPicker extends Picker {
  //     constructor(options) {
  //       super(options);
  //     }
  //     call() {
  //       return 7;
  //     }
  //    }
  // var picker = new MyPicker();
  // var table = new TableQuestion(options, picker);
  // expect(picker.table.active.length).toBe(14)
  // table.sampleR('active', 1);
  // expect(table.table.words.active.length).toBe(12)
});


test('Picker default', () => {
  var picker = new Picker();
  expect(picker.pickCorrect()).toBe(0);
  expect(picker.pickWrong()).toBe(1);
  expect(picker.pickWrong()).toBe(2);
  expect(picker.pickWrong()).toBe(3);
});

test('Picker set indexes', () => {
  var options = { correct: 1, wrong: [2,3,4]}
  var picker = new Picker(options);
  expect(picker.pickCorrect()).toBe(1);
  expect(picker.pickWrong()).toBe(2);
  expect(picker.pickWrong()).toBe(3);
  expect(picker.pickWrong()).toBe(4);
});

test('Picker gets random indexes - keeps regenerating until finds unique', () => {
  _.sample = jest.fn();
  _.sample.mockReturnValueOnce(1)
          .mockReturnValueOnce(1)
          .mockReturnValueOnce(2)
          .mockReturnValueOnce(2)
          .mockReturnValueOnce(3)
  var picker = new Picker();
  expect(picker.pickCorrect(true)).toBe(1);
  expect(picker.pickWrong(true)).toBe(2);
  expect(picker.pickWrong(true)).toBe(3);
});

test('Picker correct is singleton', () => {
  _.sample = jest.fn();
  _.sample.mockReturnValueOnce(1)
  var picker = new Picker();
  expect(picker.pickCorrect(true)).toBe(1);
  expect(picker.pickCorrect(true)).toBe(1);
});

test('Picker returns error when out of wrong indexes', () => {
  _.sample = jest.fn();
  var picker = new Picker();
  for(var i = 0; i < 14; i++) {
    _.sample.mockReturnValueOnce(i);
    picker.pickWrong(true);  
  }
  expect(() => picker.pickWrong(true)).toThrow();
});

test('Picker throws error pass same correct and wrong index', () => {
  var options = { correct: 1, wrong: [1]}
  expect(() => new Picker(options)).toThrow();
});