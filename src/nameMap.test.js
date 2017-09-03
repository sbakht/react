import { FilterByName } from './nameMap.js';

test('Filter view point', () => {
  var indexes = FilterByName.filter('3rd person').toIndex();
  expect(indexes).toEqual([0,1,2,3,4,5]);
}); 

test('Filter singular', () => {
  var indexes = FilterByName.filter('singular').toIndex();
  expect(indexes).toEqual([0,3,6,9,12]);
}); 

test('Filter feminine', () => {
  var indexes = FilterByName.filter('feminine').toIndex();
  expect(indexes).toEqual([3,4,5,9,10,11]);
}); 