import React from 'react';
import Util from './util';
import { Table } from './table'
import _ from 'underscore';

test('builds simple active maadhi table', () => {
  var options = { letters : "فعل", group : "maadhi", type : "type1"}
  var table = new Table(options);
  expect(table.words.active).toMatchSnapshot();
});

test('builds simple passive maadhi table', () => {
  var options = { letters : "فعل", group : "maadhi", type : "type1"}
  var table = new Table(options);
  expect(table.words.passive).toMatchSnapshot();
});

test('builds simple active mudari table', () => {
  var options = { letters : "فعل", group : "mudari", type : "type1"}
  var table = new Table(options);
  expect(table.words.active).toMatchSnapshot();
});

test('builds simple passive mudari table', () => {
  var options = { letters : "فعل", group : "mudari", type : "type1"}
  var table = new Table(options);
  expect(table.words.passive).toMatchSnapshot();
});
