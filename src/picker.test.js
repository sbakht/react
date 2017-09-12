import { Picker, MaadhiPicker, MudariPicker, FilterByName } from './picker';
import _ from 'underscore';

test('Picker default', () => {
  var sample = jest.spyOn(_, 'sample');
  sample.mockReturnValueOnce([0])
          .mockReturnValueOnce([1])
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

test('Picker filters out correct when choosing wrong', () => {
  var picker = new Picker();
  picker.found = _.range(2,14);
  var correct = picker.pickCorrect();
  var wrong = picker.pickWrong();
  expect(correct).toBeLessThan(2);
  expect(wrong).toBeLessThan(2);
  expect(wrong).not.toBe(correct);
});

test('Picker correct is singleton', () => {
  var sample = jest.spyOn(_, 'sample');
  sample.mockReturnValueOnce([1])
  var picker = new Picker();
  expect(picker.pickCorrect()).toBe(1);
  expect(picker.pickCorrect()).toBe(1);
});

test('Picker returns error when out of wrong indexes', () => {
  var sample = jest.spyOn(_, 'sample');
  var picker = new Picker();
  for(var i = 0; i < 14; i++) {
    sample.mockReturnValueOnce([i]);
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

test('Picker filters given wrongs when picking correct choice', () => {
  var picker = new Picker({ wrong: [0,1,2,3,4,5,11,12,13]});
  expect(picker.pickCorrect()).toBeGreaterThan(5);
  expect(picker.pickCorrect()).toBeLessThan(11);
});

test('Maadhi picker doesnt allow 8/11 duplicate', () => {
  var sample = jest.spyOn(_, 'sample');
  sample.mockReturnValueOnce([7])
  var picker = new MaadhiPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([7,10]);

  sample.mockReturnValueOnce([10])
  var picker = new MaadhiPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([10,7]);
});

test('Mudari picker doesnt allow 4/7, 5/8/11 duplicate', () => {
  var sample = jest.spyOn(_, 'sample');
  sample.mockReturnValueOnce([3])
  var picker = new MudariPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([3,6]);

  sample.mockReturnValueOnce([6])
  var picker = new MudariPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([6,3]);

  sample.mockReturnValueOnce([4])
  var picker = new MudariPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([4,7,10]);

  sample.mockReturnValueOnce([7])
  var picker = new MudariPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([7,4,10]);

  sample.mockReturnValueOnce([10])
  var picker = new MudariPicker();
  picker.pickWrong();
  expect(picker.found).toEqual([10,4,7]);
});

test('Can pick the pool of choices', () => {
  var options = {chooseFrom : [3,5,6]}
  var picker = new Picker(options);
  expect(options.chooseFrom.indexOf(picker.pickCorrect())).toBeGreaterThan(-1);
  expect(options.chooseFrom.indexOf(picker.pickWrong())).toBeGreaterThan(-1);
});

test('Can pick the pool of correct choices', () => {
  var options = {chooseFromCorrect : [3,5,6]}
  var picker = new Picker(options);
  expect(options.chooseFromCorrect.indexOf(picker.pickCorrect())).toBeGreaterThan(-1);
});

test('Can pick the pool of wrong choices', () => {
  var options = {chooseFromWrong : [3,5,6]}
  var picker = new Picker(options);
  expect(options.chooseFromWrong.indexOf(picker.pickWrong())).toBeGreaterThan(-1);
});

test('Can set pool of correct and wrong choices', () => {
  var options = {chooseFromCorrect : [2], chooseFromWrong : [3]}
  var picker = new Picker(options);
  expect(picker.pickCorrect()).toBe(2);
  expect(picker.pickWrong()).toBe(3);
});

test('throws error when out of wrong choices', () => {
  var options = {chooseFromWrong : [0]}
  var picker = new Picker(options);
  picker.pickWrong();
  expect(() => picker.pickWrong()).toThrow();
});

afterEach(() => {
    if(_.sample._isMockFunction) {
      _.sample.mockRestore();
    }
});
