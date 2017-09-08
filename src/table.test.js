import React from 'react';
import Util from './util';
import { Table } from './table'
import _ from 'underscore';


describe("simple", () => {

    var options = { letters : "فعل", group : "maadhi" };
    describe("maadhi", () => {
        test('active', () => {
          for(var i = 1; i <= 6; i++) {
            options.type = "type" + i;
            var table = new Table(options);
            expect(table.words.active).toMatchSnapshot();
          }
        });

        test('passive', () => {
          for(var i = 1; i <= 6; i++) {
            options.type = "type" + i;
            var table = new Table(options);
            expect(table.words.passive).toMatchSnapshot();
          }
        });
    });

    describe("mudari", () => {
        test('active', () => {
          for(var i = 1; i <= 6; i++) {
            options.group = "mudari"
            options.type = "type" + i;
            var table = new Table(options);
            expect(table.words.active).toMatchSnapshot();
          }
        });

        test('passive', () => {
          for(var i = 1; i <= 6; i++) {
            options.group = "mudari"
            options.type = "type" + i;
            var table = new Table(options);
            expect(table.words.passive).toMatchSnapshot();
          }
        });
    });
});

describe("akrama", () => {

    var options = { letters : "فعل", advanced: true, group : "maadhi", type : "type1"}
    describe("maadhi", () => {
        test('active', () => {
          var table = new Table(options);
          expect(table.words.active).toMatchSnapshot();
        });

        test('passive', () => {
          var table = new Table(options);
          expect(table.words.passive).toMatchSnapshot();
        });
    });

    describe("mudari", () => {
        test('active', () => {
          options.group = "mudari";
          var table = new Table(options);
          expect(table.words.active).toMatchSnapshot();
        });

        test('passive', () => {
          options.group = "mudari";
          var table = new Table(options);
          expect(table.words.passive).toMatchSnapshot();
        });
    });
});

describe("sarrafa", () => {

    var options = { letters : "فعل", advanced: true, group : "maadhi", type : "type2"}
    describe("maadhi", () => {
        test('active', () => {
          var table = new Table(options);
          expect(table.words.active).toMatchSnapshot();
        });

        test('passive', () => {
          var table = new Table(options);
          expect(table.words.passive).toMatchSnapshot();
        });
    });

    describe("mudari", () => {
        test('active', () => {
          options.group = "mudari";
          var table = new Table(options);
          expect(table.words.active).toMatchSnapshot();
        });

        test('passive', () => {
          options.group = "mudari";
          var table = new Table(options);
          expect(table.words.passive).toMatchSnapshot();
        });
    });
});


describe("qaatala", () => {

    var options = { letters : "فعل", advanced: true, group : "maadhi", type : "type3"}
    describe("maadhi", () => {
        test('active', () => {
          var table = new Table(options);
          expect(table.words.active).toMatchSnapshot();
        });

        test('passive', () => {
          var table = new Table(options);
          expect(table.words.passive).toMatchSnapshot();
        });
    });

    describe("mudari", () => {
        test('active', () => {
          options.group = "mudari";
          var table = new Table(options);
          expect(table.words.active).toMatchSnapshot();
        });

        test('passive', () => {
          options.group = "mudari";
          var table = new Table(options);
          expect(table.words.passive).toMatchSnapshot();
        });
    });
});

describe("ijtanaba", () => {

    var options = { letters : "فعل", advanced: true, group : "maadhi", type : "type4"}
    describe("maadhi", () => {
        test('active', () => {
          var table = new Table(options);
          expect(table.words.active).toMatchSnapshot();
        });

        test('passive', () => {
          var table = new Table(options);
          expect(table.words.passive).toMatchSnapshot();
        });
    });

    describe("mudari", () => {
        test('active', () => {
          options.group = "mudari";
          var table = new Table(options);
          expect(table.words.active).toMatchSnapshot();
        });

        test('passive', () => {
          options.group = "mudari";
          var table = new Table(options);
          expect(table.words.passive).toMatchSnapshot();
        });
    });
});


describe("istansara", () => {

    var options = { letters : "فعل", advanced: true, group : "maadhi", type : "type5"}
    describe("maadhi", () => {
        test('active', () => {
          var table = new Table(options);
          expect(table.words.active).toMatchSnapshot();
        });

        test('passive', () => {
          var table = new Table(options);
          expect(table.words.passive).toMatchSnapshot();
        });
    });

    describe("mudari", () => {
        test('active', () => {
          options.group = "mudari";
          var table = new Table(options);
          expect(table.words.active).toMatchSnapshot();
        });

        test('passive', () => {
          options.group = "mudari";
          var table = new Table(options);
          expect(table.words.passive).toMatchSnapshot();
        });
    });
});
