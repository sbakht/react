import _ from 'underscore';
import { append, concat, uniq, prepend, compose, curry, when, ifElse, found, always, contains, all, equals, head, tail, isNil, __ } from 'ramda';

// isSubArray :: (Eq a) => [a] -> [a] -> Bool
var isSubArray = (big, sub) => all( contains(__, big), sub );

// addWhenFound :: [Found] -> Int -> [Duplicate] -> [Found]
var addWhenFound = (found, i, arr) => ifElse( contains(i), uniqConcat(found), always(found) )(arr);

// uniqConcat :: (Eq a) => [a] -> [a] -> [a]
var uniqConcat = found => compose( uniq, concat(found) );

// pickCorrect :: Picker -> Error or Int
// UNPURE
var pickCorrect = (picker) => {
  const { correct, found, pushDuplicates} = picker;
  if(typeof correct === "number") {
    picker.found = pushDuplicates(correct, found);
    return correct;
  }

  throw new Error('No correct value set');
}

// pickWrong :: Picker -> Error or Int
// UNPURE
var pickWrong = (picker) => {
  const { wrongs, found, pushDuplicates } = picker;
  var first = head(wrongs);
  picker.wrongs = tail(wrongs);

  picker.found = pushDuplicates(first, found);

  if(isNil(first)) throw new Error('Out of wrong values'); 

  return first;
}

// pushDuplicates :: (Eq a) => a -> [a] -> [a]
var pushDuplicates = (i, found) => {
  if(!isNil(i) && !contains(i, found)) return append(i, found);
  return found;
}

// pushMaadhiDuplicates :: (Eq a) => a -> [a] -> [a]
var pushMaadhiDuplicates = (i, found) => {
  found = pushDuplicates(i, found);
  found = addWhenFound(found, i, [7,10]);
  return found;
}

// pushMudariDuplicates :: (Eq a) => a -> [a] -> [a]
var pushMudariDuplicates = (i, found) => {
  found = pushDuplicates(i, found);
  found = addWhenFound(found, i, [3,6]);
  found = addWhenFound(found, i, [4,7,10]);
  return found;
}


class Picker {
  constructor({correct, wrong} = {}) {
    this.correct = correct;
    this.wrongs = wrong || [];
    this.found = [];

    if(contains(this.correct, this.wrongs)) {
      throw new Error('Can not have same correct and wrong value');
    }

  }

  pushDuplicates(i, found) {
    return pushDuplicates(i, found);
  }
}

class MaadhiPicker {
  constructor({correct, wrong} = {}) {
    this.correct = correct;
    this.wrongs = wrong || [];
    this.found = [];

    if(contains(this.correct, this.wrongs)) {
      throw new Error('Can not have same correct and wrong value');
    }

  }
  pushDuplicates(i, found) {
    return pushMaadhiDuplicates(i, found);
  }
}

class MudariPicker {
  constructor({correct, wrong} = {}) {
    this.correct = correct;
    this.wrongs = wrong || [];
    this.found = [];

    if(contains(this.correct, this.wrongs)) {
      throw new Error('Can not have same correct and wrong value');
    }

  }

  pushDuplicates(i, found) {
    return pushMudariDuplicates(i, found);
  }
}


export { Picker, MaadhiPicker, MudariPicker, pickCorrect, pickWrong };
