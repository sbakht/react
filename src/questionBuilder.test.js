// Link.react-test.js
import React from 'react';
import {QuestionBuilder, MaadhiQuestion} from './QuestionBuilder';
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

test('builds simple maadhi table', () => {
  var endings = ['','ا','وا','ت','تا','ن','ت','تما','تم','ت','تما','تن','ت','نا']
  var f = 'َ';
  var d = 'ُ';
  var k = 'ِ';
  var s = 'ْ';
  var sh ='ّ';
  var mapping = [[2], [0,2], [1], [2,4], [2,2], [4,2], [4,2], [4,1,2], [4,2,4], [2,3], [4,2,2], [4,1,5,2], [4,1], [4,2]];

  mapping = mapping.map(function(m) {
    return [2,2].concat(m);
  });
  var vowels = mapping.map(m => m.map(replacer));

  var str = "فعل"
  var words = [];

  endings.map(function(ending, i) {
    var word = str + ending;
    var useVowels = vowels[i] || ['','',''];
    words.push(_.flatten(_.zip(word.split(''), useVowels)).join(''));
  });

  function replacer(i) {
    if(i === 0) {
      return '';
    }
    if(i === 1) {
      return d;
    }
    if(i === 2) {
      return f;
    }
    if(i === 3) {
      return k;
    }
    if(i === 4) {
      return s;
    }
    if(i === 5) {
      return sh;
    }
  }

  expect(words).toMatchSnapshot();
});

