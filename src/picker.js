import _ from 'underscore';

class Picker {
  constructor({correct, wrong} = {}) {
    this.i = -1;
    this.correct = correct;
    this.wrongs = wrong || [];
    this.found = wrong || [];

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

    var i = _.sample()
    while(this.found.indexOf(i) > -1) {
      i = _.sample();
    }
    this.found.push(i);
    this.correct = i;
    return i;
  }
  pickWrong() {
    if(this.wrongs.length) {
      return this.wrongs.shift();
    }

    if(this.found.length === 14) {
      throw new Error('Out of unique indexes');
    } 

    var i = _.sample();
    while(this.found.indexOf(i) > -1) {
      i = _.sample();
    }
    this.found.push(i);
    this.pushDuplicates(i);
    return i;
  }
  pushDuplicates() {
  }
}

class MaadhiPicker extends Picker {
  constructor(options) {
    super(options);
  }

  pushDuplicates(i) {
    if(i === 7) {
      this.found.push(10);
    }else if(i === 10) {
      this.found.push(7);
    }
  }
}

class MudariPicker extends Picker {
  constructor(options) {
    super(options);
  }

  pushDuplicates(i) {
    if(i === 3) {
      this.found.push(6);
    }else if(i === 6) {
      this.found.push(3);
    }else if(i == 4) {
      this.found.push(7);
      this.found.push(10);
    }else if(i == 7) {
      this.found.push(4);
      this.found.push(10);
    }else if(i == 10) {
      this.found.push(4);
      this.found.push(7);
    }
  }
}

export { Picker, MaadhiPicker, MudariPicker };
