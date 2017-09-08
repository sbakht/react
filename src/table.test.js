import React from 'react';
import Util from './util';
import { Table } from './table'
import _ from 'underscore';

test('builds simple active maadhi table', () => {
  for(var i = 1; i <= 6; i++) {
    var options = { letters : "فعل", group : "maadhi", type : "type" + i}
    var table = new Table(options);
    expect(table.words.active).toMatchSnapshot();
  }
});

test('builds simple passive maadhi table', () => {
  for(var i = 1; i <= 6; i++) {
    var options = { letters : "فعل", group : "maadhi", type : "type" + i}
    var table = new Table(options);
    expect(table.words.passive).toMatchSnapshot();
  }
});

test('builds simple active mudari table', () => {
  for(var i = 1; i <= 6; i++) {
    var options = { letters : "فعل", group : "mudari", type : "type" + i}
    var table = new Table(options);
    expect(table.words.active).toMatchSnapshot();
  }
});

test('builds simple passive mudari table', () => {
  for(var i = 1; i <= 6; i++) {
    var options = { letters : "فعل", group : "mudari", type : "type" + i}
    var table = new Table(options);
    expect(table.words.passive).toMatchSnapshot();
  }
});
