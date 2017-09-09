import React from 'react';
import Util from './util';
import { Table } from './table'
import _ from 'underscore';

function tableTests(options) {
    var table;
    beforeEach(() => {
      table = new Table(options);
    });

    describe("maadhi", () => {
        test('active', () => {
          expect(table.words.maadhi.active).toMatchSnapshot();
        });

        test('passive', () => {
          expect(table.words.maadhi.passive).toMatchSnapshot();
        });
    });

    describe("mudari", () => {
        test('active', () => {
          expect(table.words.mudari.active).toMatchSnapshot();
        });

        test('passive', () => {
          expect(table.words.mudari.passive).toMatchSnapshot();
        });
    });
}

describe("simple", () => {

  describe("nasara", () => {
      var options = { letters : "فعل", type : "type1"}
      tableTests(options);
  });

  describe("daraba", () => {
      var options = { letters : "فعل", type : "type2"}
      tableTests(options);
  });
  describe("sameya", () => {
      var options = { letters : "فعل", type : "type3"}
      tableTests(options);
  });
  describe("fataha", () => {
      var options = { letters : "فعل", type : "type4"}
      tableTests(options);
  });
  describe("karuma", () => {
      var options = { letters : "فعل", type : "type5"}
      tableTests(options);
  });
  describe("haseba", () => {
      var options = { letters : "فعل", type : "type6"}
      tableTests(options);
  });
  
});

describe("advanced", () => {

  describe("akrama", () => {
    var options = { letters : "فعل", advanced: true, type : "type1"}
    tableTests(options);
  });

  describe("sarrafa", () => {
      var options = { letters : "فعل", advanced: true, type : "type2"}
      tableTests(options);
  });

  describe("qaatala", () => {
      var options = { letters : "فعل", advanced: true, type : "type3"}
      tableTests(options);
  });

  describe("taqabbala", () => {
      var options = { letters : "فعل", advanced: true, type : "type4"}
      tableTests(options);
  });

  describe("taqaabala", () => {
      var options = { letters : "فعل", advanced: true, type : "type5"}
      tableTests(options);
  });

  describe("ijtanaba", () => {
      var options = { letters : "فعل", advanced: true, type : "type6"}
      tableTests(options);
  });

  describe("istansara", () => {
      var options = { letters : "فعل", advanced: true, type : "type7"}
      tableTests(options);
  });

  describe("infatara", () => {
      var options = { letters : "فعل", advanced: true, type : "type8"};
      tableTests(options);
  });

});
