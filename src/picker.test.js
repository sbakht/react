import { Picker, MaadhiPicker, MudariPicker, pickCorrect, pickWrong } from './picker';
import _ from 'underscore';

test('Picker default', () => {
  var picker = new Picker({ correct : 1, wrong : [2] });
  expect(pickCorrect(picker)).toBe(1);
  expect(pickWrong(picker)).toBe(2);
});

test('Picker set indexes', () => {
  var options = { correct: 1, wrong: [2,3,4]}
  var picker = new Picker(options);
  expect(pickCorrect(picker)).toBe(1);
  expect(pickWrong(picker)).toBe(2);
  expect(pickWrong(picker)).toBe(3);
  expect(pickWrong(picker)).toBe(4);
});

test('Picker correct is singleton', () => {
  var picker = new Picker({ correct : 1});
  expect(pickCorrect(picker)).toBe(1);
  expect(pickCorrect(picker)).toBe(1);
});


test('Picker throws error when pickCorrect(), but correct not set', () => {
  var picker = new Picker();
  expect(() => pickCorrect(picker)).toThrow('No correct value set');
});

test('Picker throws error pass same correct and wrong index', () => {
  var options = { correct: 1, wrong: [1]}
  expect(() => new Picker(options)).toThrow('Can not have same correct and wrong value');
});

test('Picker ignores repeat wrong indexes', () => {
  var options = { wrong: [1,1]}
  var picker = new Picker(options);
  pickWrong(picker);
  pickWrong(picker);
  expect(picker.found).toEqual([1]);
});

describe("type specific", () => {

    test('Maadhi picker doesnt allow 8/11 duplicate', () => {
      var picker = new MaadhiPicker({wrong : [7]});
      pickWrong(picker);
      expect(picker.found).toEqual([7,10]);

      var picker = new MaadhiPicker({wrong : [10]});
      pickWrong(picker);
      expect(picker.found).toEqual([10,7]);
    });

    test('Mudari picker doesnt allow 4/7, 5/8/11 duplicate', () => {
      var picker = new MudariPicker({wrong : [3]});
      pickWrong(picker);
      expect(picker.found).toEqual([3,6]);

      var picker = new MudariPicker({wrong : [6]});
      pickWrong(picker);
      expect(picker.found).toEqual([6,3]);

      var picker = new MudariPicker({wrong : [4]});
      pickWrong(picker);
      expect(picker.found).toEqual([4,7,10]);

      var picker = new MudariPicker({wrong : [7]});
      pickWrong(picker);
      expect(picker.found).toEqual([7,4,10]);

      var picker = new MudariPicker({wrong : [10]});
      pickWrong(picker);
      expect(picker.found).toEqual([10,4,7]);
    });

});

test('throws error when out of wrong choices', () => {
  var options = { wrong : [0]}
  var picker = new Picker(options);
  pickWrong(picker);
  expect(() => pickWrong(picker)).toThrow('Out of wrong values');
});

test('pushDuplicates doesnt allow duplicate values', () => {
  var picker = new Picker();
  var found = [];
  found = picker.pushDuplicates(0, found);
  found = picker.pushDuplicates(0, found);
  expect(found).toEqual([0]);
});

test('pushDuplicates doesnt allow null values ', () => {
  var picker = new Picker();
  var found = [];
  found = picker.pushDuplicates(0, found);
  found = picker.pushDuplicates(undefined, found);
  found = picker.pushDuplicates(null, found);
  expect(found).toEqual([0]);
});

test("Maybe fail on setting correct", () => {

});
