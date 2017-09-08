import _ from 'underscore';
import Dictionary from './util/dictionary';

var d = 'ُ';
var f = 'َ';
var k = 'ِ';
var s = 'ْ';
var sh ='ّ';

function replacer(i) {
  if(i === 0) {
    return '';
  }
  if(i === 1) {
    return d;
  }
  if(i === 2) {
    return f;
  }
  if(i === 3) {
    return k;
  }
  if(i === 4) {
    return s;
  }
  if(i === 5) {
    return sh;
  }
  if(i === 51) {
    return sh + d;
  }
  if(i === 52) {
    return sh + f;
  }
  if(i === 53) {
    return sh + k;
  }
}

class Table {
  constructor(options) {
    this.words = {};
    this.type = options.type;
    this.group = options.group;
    this.str = options.letters;
    this.complex = options.advanced ? "advanced" : "simple";
    if(options.letters) {
      this.build(options.letters, options.type);
    }
  }

  build(str) {
    this.buildActive()
    this.buildPassive()
  }

  buildActive() {
    var vowels = this.setupVowels();
    var letters = this.setupLetters(letters);

    this.words.active = this.getWords(letters, vowels);
  }

  buildPassive() {
    var vowels = this.setupVowels(true);
    var letters = this.setupLetters(letters, true);

    this.words.passive = this.getWords(letters, vowels);
  }

  getWords(letters, vowels) {
    letters = letters.map(item => item.split(''));
    var words = _.zip(letters,vowels).map(function(item) {
      return _.flatten(_.zip(item[0], item[1])).join('');
    })
    return words;
  }

  setupVowels(isPassive) {
    var vowels = Dictionary.verb[this.complex].maps[this.type][this.group].vowels; 
    if(isPassive) {
        var beginVowels = vowels.passive;
    }else{
        var beginVowels = vowels.beginning;
    }
    vowels = vowels.end.map(item => beginVowels.concat(item));
    vowels = vowels.map(m => m.map(replacer));
    return vowels;
  }

  setupLetters(letters, isPassive) {
    var letters = Dictionary.verb[this.complex].maps[this.type][this.group].letters; 
    letters = letters.end.map((item, i) => {
        var rest = this.str;
        if(isPassive) {
            var beginning = letters.passive && letters.passive[i] || letters.beginning[i];
        }else{
            var beginning = letters.beginning[i];
        }
        while(beginning.indexOf('b') > -1) {
            beginning = beginning.replace('b', rest[0]);
            rest = rest.substring(1); 
        }
        return beginning + rest + item;
    });
    return letters;
  }
}

export { Table }
