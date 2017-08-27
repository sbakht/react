import _ from 'underscore';
import Dictionary from './util/dictionary';

var endings = Dictionary.verb.simple.endings;
var beginnings = Dictionary.verb.simple.beginnings;
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
    if(options.letters) {
      this.build(options.letters, options.type);
    }
  }

  build(str, type) {
    this.buildActive(str, type)
    this.buildPassive(str, type)
  }

  mappings(isPassive) {
    if(isPassive) {
      var firstVowels = Dictionary.verb.simple.maps.passive[this.group];
    }else{
      var firstVowels = Dictionary.verb.simple.maps[this.type][this.group];
    }
    var mapping = Dictionary.verb.simple.maps.enders[this.group];

    var completeMapping = mapping.map(m => firstVowels.concat(m));
    return completeMapping.map(m => m.map(replacer));
  }

  buildActive(str, type) {
    var words = [];
    var vowels = this.mappings();

    endings[this.group].map(function(ending, i) {
      var word =  beginnings[this.group][i] + str + ending;
      var useVowels = vowels[i] || ['','',''];
      words.push(_.flatten(_.zip(word.split(''), useVowels)).join(''));
    }, this);

    this.words.active = words;
  }

  buildPassive(str, type) {
    var words = [];
    var vowels = this.mappings(true)

    endings[this.group].map(function(ending, i) {
      var word = beginnings[this.group][i] + str + ending;
      var useVowels = vowels[i] || ['','',''];
      words.push(_.flatten(_.zip(word.split(''), useVowels)).join(''));
    }, this);

    this.words.passive = words;
  }
}

export { Table }