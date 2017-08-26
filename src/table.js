import _ from 'underscore';
import Dictionary from './util/dictionary';

var endings = Dictionary.verb.simple.endings;
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
    if(options.letters) {
      this.build(options.letters, options.type);
    }
  }

  build(str, type) {
    this.buildActive(str, type)
    this.buildPassive(str, type)
  }

  mappings(firstVowels) {
    firstVowels = firstVowels || Dictionary.verb.simple.maps[this.type].beginners;
    var mapping = Dictionary.verb.simple.maps[this.type].enders;

    var completeMapping = mapping.map(m => firstVowels.concat(m));
    return completeMapping.map(m => m.map(replacer));
  }

  buildActive(str, type) {
    var words = [];
    var vowels = this.mappings();

    endings.map(function(ending, i) {
      var word = str + ending;
      var useVowels = vowels[i] || ['','',''];
      words.push(_.flatten(_.zip(word.split(''), useVowels)).join(''));
    });

    this.words.active = words;
  }

  buildPassive(str, type) {
    var words = [];
    var vowels = this.mappings([1,3])

    endings.map(function(ending, i) {
      var word = str + ending;
      var useVowels = vowels[i] || ['','',''];
      words.push(_.flatten(_.zip(word.split(''), useVowels)).join(''));
    });

    this.words.passive = words;
  }
}

export { Table }