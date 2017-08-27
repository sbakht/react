import _ from 'underscore';
import Generator from './generator';
import Util from './util';
import {Table} from './table';

function buildChoice(val, isCorrect) {
  if (isCorrect) {
    return { val, text: val, isCorrect: true };
  }
  return { val, text: val, isWrong: true };
}

function pluckMany(obj, arr) {
  const result = {};
  arr.forEach((item) => {
    result[item] = obj[item];
  });
  return result;
}


class QuestionBuilder {
  constructor({text, numQuestions}) {
    this.text = text;
    this.numQuestions = numQuestions || 3; // es6 to set default??
  }
}

class MaadhiQuestion extends QuestionBuilder {
  constructor(options) {
    super(options);
    this.build(options.pick, options.type);
  }

  build(pick, type) {
    const roots = Util.Root.getRandom(3);
    const gen = Generator(roots, false);

    const choices = new Choices(gen.word, pick, roots, type);
    this.question = {
      text: this.text,
      choices,
    };
  }
}

class Choices {
  constructor(genWords, pick, roots, type) {
    var wrong = Array(3).fill(1).map(function() {
      return new WrongChoice(genWords, pick).choice;
    });
    var right = new CorrectChoice(roots, type).choice;
    return wrong.concat(right);
  }

}

class CorrectChoice {
  constructor(roots, type) {
    this.build(roots, type);
  }

  build(roots, type) {
    const word = Util.Root.addVowels(roots, type);
    this.choice = { val: word, text: word, isCorrect: true };
  }
}

class WrongChoice {
  constructor(genWords, pick) {
    this.build(genWords, pick);
  }

  build(genWords, pick) {
    const word = _.sample(pluckMany(genWords, pick), 1);
    this.choice = buildChoice(word, false);
  }
}

var textMap = [
  "he",
  "he (dual)",
  "he (plural)",
  "she",
  "she (dual)",
  "she (plural)",
  "you (m)",
  "you (dual m)",
  "you (plural m)",
  "you (f)",
  "you (dual f)",
  "you (plural f)",
  "I",
  "We"
];

class TableQuestion {
  constructor(options) {
    this.choose = options.choose;
    this.group = options.group;
    this.table = new Table(options);
  }

  build(options) {
    var correct = this.getCorrect();
    var wrong = this.getWrong();
    var choices = wrong.concat(correct);

    var question = {
      text : this.getText(),
      choices
    }
    this.question = question;
  }

  getText() {
    return `${this.group} ${textMap[this.choose]}`;
  }

  getCorrect() {
    var item = this.table.words.active[this.choose];
    this.table.words.active = _.without(this.table.words.active, item);
    return buildChoice(item, true);
  }

  getWrong() {
    return Array(3).fill(1).map(function() {
          var word = sampleR.call(this, 1);
          return buildChoice(word, false);
        }, this);
  }
}

function sampleR(count) {
  var items = _.sample(this.table.words.active, count);
  this.table.words.active = _.without(this.table.words.active, ...items)
  return items[0];
}

export { QuestionBuilder, MaadhiQuestion, TableQuestion};

