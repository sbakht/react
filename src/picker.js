import _ from 'underscore';
import { append, concat, uniq, prepend, compose, curry, when, ifElse, found, always, contains, all, equals, head, tail, __ } from 'ramda';

var isSubArray = (big, sub) => all( contains(__, big), sub );

var addWhenFound = (found, arr, i) => ifElse( contains(i), uniqConcat(found), always(found) )(arr);

var uniqConcat = found => compose( uniq, concat(found) );

var hasDuplicates = arr => !equals( uniq(arr), arr );

class Picker {
  constructor({correct, wrong, chooseFrom, chooseFromCorrect, chooseFromWrong} = {}) {
    this.i = -1;
    this.correct = correct;
    this.wrongs = wrong || [];
    this.found = _.clone(wrong) || [];
    this.chooseFrom = chooseFrom || Array.apply(null, {length: 14}).map(Number.call, Number);
    this.chooseFromCorrect = chooseFromCorrect || this.chooseFrom;
    this.chooseFromWrong = chooseFromWrong || this.chooseFrom;

    if(contains(this.correct, this.wrongs)) {
      throw new Error('Can not have same correct and wrong index');
    }

    if(hasDuplicates(this.wrongs)) {
      throw new Error('Can not have duplicate wrong index');
    }
  }
  pickCorrect() {
    if(typeof this.correct === "number") {
      return this.correct; 
    }

    do {
      var i = _.sample(this.chooseFromCorrect, 1)[0];
    } while( contains(i, this.found) );

    this.pushDuplicates(i);
    this.correct = i;
    return i;
  }
  pickWrong() {
    if(this.wrongs.length) {
      var first = head(this.wrongs);
      this.wrongs = tail(this.wrongs);
      return first;
    }

    if(isSubArray(this.found, this.chooseFromWrong)) {
      throw new Error('Out of unique indexes');
    } 
    
    var getFromWrong = (found, chooseFromWrong, i) => {
      do {
        var i = _.sample(chooseFromWrong, 1)[0];
      } while( contains(i, found) );
      return i;
    }

    var i = getFromWrong(this.found, this.chooseFromWrong, i);

    this.pushDuplicates(i, this.found);
    return i;
  }
  pushDuplicates(i, found) {
    found = append(i, found);
    this.found = found;
  }
}

class MaadhiPicker extends Picker {
  constructor(options) {
    super(options);
  }

  pushDuplicates(i, found) {
    found = append(i, found);
    found = addWhenFound(found, [7,10], i);
    this.found = found;
  }
}

class MudariPicker extends Picker {
  constructor(options) {
    super(options);
  }

  pushDuplicates(i, found) {
    found = append(i, found);
    found = addWhenFound(found, [3,6], i);
    found = addWhenFound(found, [4,7,10], i);
    this.found = found;
  }
}


export { Picker, MaadhiPicker, MudariPicker };
