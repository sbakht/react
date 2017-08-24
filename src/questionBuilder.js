import _ from 'underscore';
import Generator from './generator';
import Util from './util';

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

    const choices = new Choices(gen, pick, roots, type);
    this.question = {
      text: this.text,
      choices,
    };
  }
}

class Choices {
  constructor(gen, pick, roots, type) {
    var wrong = Array(3).fill(1).map(function() {
      return new WrongChoice(gen, pick).choice;
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
  constructor(gen, pick) {
    this.build(gen, pick);
  }

  build(gen, pick) {
    const word = _.sample(pluckMany(gen.word, pick), 1);
    this.choice = buildChoice(word, false);
  }
}

export { QuestionBuilder, MaadhiQuestion};

