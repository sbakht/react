import React from 'react';
import Util from './util';
import { Table } from './table'
import _ from 'underscore';

test('builds simple maadhi table', () => {
  var options = { letters : "فعل", group : "maadhi", type : "type1"}
  var table = new Table(options);
  expect(table.words.active).toMatchSnapshot();
  expect(table.words.passive).toMatchSnapshot();
});

