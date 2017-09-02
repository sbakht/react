import { Picker, MaadhiPicker, MudariPicker } from './picker';
import _ from 'underscore';

test('Picker default', () => {
    _.sample = jest.fn();
  _.sample.mockReturnValueOnce(0)
          .mockReturnValueOnce(1)
  var picker = new Picker();
  expect(picker.pickCorrect()).toBe(0);
  expect(picker.pickWrong()).toBe(1);
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
  expect(picker.pickWrong()).toBe(2);
  expect(picker.pickWrong()).toBe(3);
});

test('Picker correct is singleton', () => {
  _.sample = jest.fn();
  _.sample.mockReturnValueOnce(1)
  var picker = new Picker();
  expect(picker.pickCorrect()).toBe(1);
  expect(picker.pickCorrect()).toBe(1);
});

test('Picker returns error when out of wrong indexes', () => {
  _.sample = jest.fn();
  var picker = new Picker();
  for(var i = 0; i < 14; i++) {
    _.sample.mockReturnValueOnce(i);
    picker.pickWrong();  
  }
  expect(() => picker.pickWrong()).toThrow();
});

test('Picker throws error pass same correct and wrong index', () => {
  var options = { correct: 1, wrong: [1]}
  expect(() => new Picker(options)).toThrow();
});

test('Picker throws error pass multiple of same wrong index', () => {
  var options = { wrong: [1, 1]}
  expect(() => new Picker(options)).toThrow();
});

test('Picker checks correct against sent wrongs', () => {
  _.sample = jest.fn();
  _.sample.mockReturnValueOnce(1)
          .mockReturnValueOnce(2)
  var picker = new Picker({ wrong: [1]});
  expect(picker.pickCorrect()).toBe(2);
});

test('Maadhi picker doesnt allow 8/11 duplicate', () => {
  _.sample = jest.fn();
  _.sample.mockReturnValueOnce(7)
  var picker = new MaadhiPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([7,10]);

  _.sample.mockReturnValueOnce(10)
  var picker = new MaadhiPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([10,7]);
});

test('Mudari picker doesnt allow 4/7, 5/8/11 duplicate', () => {
  _.sample = jest.fn();
  _.sample.mockReturnValueOnce(3)
  var picker = new MudariPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([3,6]);

  _.sample.mockReturnValueOnce(6)
  var picker = new MudariPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([6,3]);

  _.sample.mockReturnValueOnce(4)
  var picker = new MudariPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([4,7,10]);

  _.sample.mockReturnValueOnce(7)
  var picker = new MudariPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([7,4,10]);

  _.sample.mockReturnValueOnce(10)
  var picker = new MudariPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([10,4,7]);
});