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
  call() {
    this.i++; 
    return this.i;
  }
  pickCorrect(random) {
    if(typeof this.correct === "number") {
      return this.correct; 
    }

    if(random) {
      var i = _.sample()
      while(this.found.indexOf(i) > -1) {
        i = _.sample();
      }
      this.found.push(i);
      this.correct = i;
      return i;
    } 

    return this.call();
  }
  pickWrong(random) {
    if(this.wrongs.length) {
      return this.wrongs.shift();
    }

    if(random) {
      if(this.found.length === 14) {
        throw new Error('Out of unique indexes');
      } 

      var i = _.sample();
      while(this.found.indexOf(i) > -1) {
        i = _.sample();
      }
      this.found.push(i);
      return i;
    } 

    return this.call();
  }
}

export { Picker };
