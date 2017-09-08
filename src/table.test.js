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

test('builds akrama active maadhi table', () => {
  var options = { letters : "فعل", advanced: true, group : "maadhi", type : "type1"}
  var table = new Table(options);
  expect(table.words.active).toMatchSnapshot();
});

test('builds akrama passive maadhi table', () => {
  var options = { letters : "فعل", advanced: true, group : "maadhi", type : "type1"}
  var table = new Table(options);
  expect(table.words.passive).toMatchSnapshot();
});

test('builds akrama active mudari table', () => {
  var options = { letters : "فعل", advanced: true, group : "mudari", type : "type1"}
  var table = new Table(options);
  expect(table.words.active).toMatchSnapshot();
});

test('builds akrama passive mudari table', () => {
  var options = { letters : "فعل", advanced: true, group : "mudari", type : "type1"}
  var table = new Table(options);
  expect(table.words.passive).toMatchSnapshot();
});