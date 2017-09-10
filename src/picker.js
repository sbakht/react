import _ from 'underscore';
import { append, concat, uniq, prepend, compose, curry, when } from 'ramda';

var isSubArray = function(big, sub) {
  var isSub = true;
  sub.forEach((item) => {
    if(big.indexOf(item) === -1) {
      isSub = false;
      return;
    }
  });

  return isSub;
}

class Picker {
  constructor({correct, wrong, chooseFrom, chooseFromCorrect, chooseFromWrong} = {}) {
    this.i = -1;
    this.correct = correct;
    this.wrongs = wrong || [];
    this.found = wrong || [];
    this.chooseFrom = chooseFrom || Array.apply(null, {length: 14}).map(Number.call, Number);
    this.chooseFromCorrect = chooseFromCorrect || this.chooseFrom;
    this.chooseFromWrong = chooseFromWrong || this.chooseFrom;

    if(this.wrongs.indexOf(this.correct) > -1) {
      throw new Error('Can not have same correct and wrong index');
    }

    if(_.uniq(this.wrongs).length < this.wrongs.length) {
      throw new Error('Can not have duplicate wrong index');
    }
  }
  pickCorrect() {
    if(typeof this.correct === "number") {
      return this.correct; 
    }

    do {
      var i = _.sample(this.chooseFromCorrect, 1)[0];
    } while(this.found.indexOf(i) > -1);

    this.pushDuplicates(i);
    this.correct = i;
    return i;
  }
  pickWrong() {
    if(this.wrongs.length) {
      return this.wrongs.shift();
    }

    if(isSubArray(this.found, this.chooseFromWrong)) {
      throw new Error('Out of unique indexes');
    } 
    
    do {
      var i = _.sample(this.chooseFromWrong, 1)[0];
    } while(this.found.indexOf(i) > -1);

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

var addWhenFound = curry((found, arr, i) => {
  return arr.indexOf(i) > -1 ? uniqConcat(found, arr) : found;
});

var uniqConcat = curry((found, arr) => {
  return compose( uniq, concat(found) )(arr);
});


export { Picker, MaadhiPicker, MudariPicker };