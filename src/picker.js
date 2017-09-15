import _ from 'underscore';
import { append, concat, uniq, prepend, compose, curry, when, ifElse, found, always, contains, all, equals, head, tail, isNil, __ } from 'ramda';

var isSubArray = (big, sub) => all( contains(__, big), sub );

var addWhenFound = (found, arr, i) => ifElse( contains(i), uniqConcat(found), always(found) )(arr);

var uniqConcat = found => compose( uniq, concat(found) );

class Picker {
  constructor({correct, wrong} = {}) {
    this.correct = correct;
    this.wrongs = wrong || [];
    this.found = [];

    if(contains(this.correct, this.wrongs)) {
      throw new Error('Can not have same correct and wrong value');
    }

  }

  pickCorrect() {
    var correct = this.correct;
    if(typeof correct === "number") {
      this.found = this.pushDuplicates(correct, this.found);
      return correct;
    }

    throw new Error('No correct value set');
  }

  pickWrong() {
    var first = head(this.wrongs);
    this.wrongs = tail(this.wrongs);

    this.found = this.pushDuplicates(first, this.found);

    if(isNil(first)) throw new Error('Out of wrong values'); 

    return first;
  }

  pushDuplicates(i, found) {
    if(!isNil(i) && !contains(i, found)) return append(i, found);
    return found;
  }
}

class MaadhiPicker extends Picker {
  constructor(options) {
    super(options);
  }

  pushDuplicates(i, found) {
    found = super.pushDuplicates(i, found);
    found = addWhenFound(found, [7,10], i);
    return found;
  }
}

class MudariPicker extends Picker {
  constructor(options) {
    super(options);
  }

  pushDuplicates(i, found) {
    found = super.pushDuplicates(i, found);
    found = addWhenFound(found, [3,6], i);
    found = addWhenFound(found, [4,7,10], i);
    return found;
  }
}


export { Picker, MaadhiPicker, MudariPicker };
