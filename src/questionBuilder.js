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
  constructor(options, Picker, PickerClass) {
    this.choose = options.choose;
    this.group = options.group;
    this.voice = options.voice || "active";
    this.include = options.include || ['active', 'passive'];
    this.exclude = options.exclude || [];
    this.include = _.without(this.include, ...this.exclude);
    this.Picker = Picker;
    this.pickerClass = PickerClass || false;
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
    var item = this.table.words[this.voice][this.choose];
    this.table.words[this.voice] = _.without(this.table.words[this.voice], item);
    return buildChoice(item, true);
  }

  getWrong() {
    return Array(3).fill(1).map(function() {
          var voice = this.include[_.random(0, this.include.length-1)]
          var word = this.sampleR(voice, 1);
          return buildChoice(word, false);
        }, this);
  }

  //need to test this
  sampleR(voice, count) {
    var word = this.pick(count);
    //this.table.words[voice] = this.pop(word);
    return word;
  }
  pick(count) {
    var table = this.table.words[this.voice];
    var i = _.random(0, this.voice.length - 1);
    if(this.pickerClass) {
        this.pickerClass.init(this.table.words.active);
        this.pickerClass.call();
        this.pickerClass.pick();
        return this.pickerClass.picked;
    }else{
        var i = this.Picker.call();
    }
    return table[i];
    return _.sample(table, count)[0]
  }
  pop(word) {
    var table = this.table.words[this.voice];
    return _.without(table, word)
  }
}

class Picker {
   init(active) {
     this.words = active;
     this.i = -1;
   }
   call() {
    this.i++; 
   }
    pick() {
        
    }
}


export { QuestionBuilder, MaadhiQuestion, TableQuestion, Picker };

