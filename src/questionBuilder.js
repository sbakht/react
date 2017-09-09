import _ from 'underscore';
import Generator from './generator';
import Util from './util';
import { Table } from './table';
import { Picker, MaadhiPicker, MudariPicker } from './picker';

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
  constructor(options, pickerClass, maadhiPicker, mudariPicker) {
    this.choose = options.choose;
    this.group = options.group;
    this.voice = options.voice || "active";
    this.include = options.include || [];
    this.exclude = options.exclude || [];
    this.includeGroup = options.includeGroup || [];
    this.include = _.without(this.include, ...this.exclude);
    this.table = new Table(options).words;
    this.text = options.text || this.getText();

    this.pickerClass = pickerClass || new Picker();
    if(this.includeGroup.length) {
      this.maadhiPicker = maadhiPicker || new MaadhiPicker();
      this.mudariPicker = mudariPicker || new MudariPicker();
    }
  }

  build(options) {
    var correct = this.getCorrect();
    var wrong = this.getWrong();
    var choices = wrong.concat(correct);

    var question = {
      text : this.text,
      choices
    }
    this.question = question;
  }

  getText() {
    return `${this.group} ${textMap[this.choose]}`;
  }

  getCorrect() {
    var voice = this.include.length && this.include[_.random(0, this.include.length-1)] || this.voice;
    var group = this.includeGroup.length && this.includeGroup[_.random(0, this.includeGroup.length-1)] || this.group;
    var table = this.table[group][voice];
    if(group === "maadhi" && this.maadhiPicker) {
      var i = this.maadhiPicker.pickCorrect();
    }else if(group === "mudari" && this.mudariPicker) {
      var i = this.mudariPicker.pickCorrect();
    }else{
      var i = this.pickerClass.pickCorrect();
    }
  return buildChoice(table[i], true);
  }

  getWrong() {
    return Array(3).fill(1).map(function() {
          var voice = this.include.length && this.include[_.random(0, this.include.length-1)] || this.voice;
          var group = this.includeGroup.length && this.includeGroup[_.random(0, this.includeGroup.length-1)] || this.group;
          var word = this.sampleR(group, voice, 1);
          return buildChoice(word, false);
        }, this);
  }

  sampleR(group, voice, count) {
    var table = this.table[group][voice];
    if(group === "maadhi" && this.maadhiPicker) {
      var i = this.maadhiPicker.pickWrong();
    }else if(group === "mudari" && this.mudariPicker) {
      var i = this.mudariPicker.pickWrong();
    }else{
      var i = this.pickerClass.pickWrong();
    }
    return table[i];
  }
}

export { QuestionBuilder, MaadhiQuestion, TableQuestion };