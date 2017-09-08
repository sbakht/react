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
}

class Table {
  constructor(options) {
    this.words = {};
    this.type = options.type;
    this.group = options.group;
    this.str = options.letters;
    if(options.letters) {
      this.build(options.letters, options.type);
    }
  }

  build(str) {
    this.buildActive(str)
    this.buildPassive(str)
  }

  buildActive() {
    var vowels = Dictionary.verb.simple.maps[this.type][this.group].vowels; 
    var beginVowels = vowels.beginning;
    vowels = vowels.end.map(item => beginVowels.concat(item));
    vowels = vowels.map(m => m.map(replacer));

    var letters = Dictionary.verb.simple.maps[this.type][this.group].letters; 
    letters = letters.end.map((item, i) => letters.beginning[i] + this.str + item );
    letters = letters.map(item => item.split(''));
    var words = _.zip(letters,vowels).map(function(item) {
      return _.flatten(_.zip(item[0], item[1])).join('');
    })
    this.words.active = words;
  }

  buildPassive() {
    var vowels = Dictionary.verb.simple.maps[this.type][this.group].vowels; 
    var beginVowels = Dictionary.verb.simple.maps.passive[this.group];
    vowels = vowels.end.map(item => beginVowels.concat(item));
    vowels = vowels.map(m => m.map(replacer));

    var letters = Dictionary.verb.simple.maps[this.type][this.group].letters; 
    letters = letters.end.map((item, i) => letters.beginning[i] + this.str + item );
    letters = letters.map(item => item.split(''));
    var words = _.zip(letters,vowels).map(function(item) {
      return _.flatten(_.zip(item[0], item[1])).join('');
    })
    this.words.passive = words;
  }
}

export { Table }