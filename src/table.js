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
    this.advanced = options.advanced;
    if(options.letters) {
      this.build(options.letters, options.type);
    }
  }

  build(str) {
    if(this.advanced) {
      this.buildAdvanced();
    }else{
      this.buildActive()
      this.buildPassive()
    }
  }

  buildAdvanced() {
    var vowels = Dictionary.verb.advanced.maps[this.type][this.group].vowels; 
    var beginVowels = vowels.beginning;
    vowels = vowels.end.map(item => beginVowels.concat(item));
    vowels = vowels.map(m => m.map(replacer));

    var letters = Dictionary.verb.advanced.maps[this.type][this.group].letters; 
    letters = letters.end.map((item, i) => {
        var rest = this.str;
        var beginning = letters.beginning[i];
        while(beginning.indexOf('b') > -1) {
            beginning = beginning.replace('b', rest[0]);
            rest = rest.substring(1); 
        }
        return beginning + rest + item;
    });
    letters = letters.map(item => item.split(''));
    var words = _.zip(letters,vowels).map(function(item) {
      return _.flatten(_.zip(item[0], item[1])).join('');
    })
    this.words.active = words;

    var vowels = Dictionary.verb.advanced.maps[this.type][this.group].vowels; 
    var beginVowels = vowels.passive;
    vowels = vowels.end.map(item => beginVowels.concat(item));
    vowels = vowels.map(m => m.map(replacer));

    var letters = Dictionary.verb.advanced.maps[this.type][this.group].letters; 
    letters = letters.end.map((item, i) => {
        var rest = this.str;
        var beginning = letters.passive && letters.passive[i] || letters.beginning[i];
        while(beginning.indexOf('b') > -1) {
            beginning = beginning.replace('b', rest[0]);
            rest = rest.substring(1); 
        }
        return beginning + rest + item;
    });
    letters = letters.map(item => item.split(''));
    var words = _.zip(letters,vowels).map(function(item) {
      return _.flatten(_.zip(item[0], item[1])).join('');
    })
    this.words.passive = words;
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
    var beginVowels = vowels.passive;
    vowels = vowels.end.map(item => beginVowels.concat(item));
    vowels = vowels.map(m => m.map(replacer));

    var letters = Dictionary.verb.simple.maps[this.type][this.group].letters; 
    letters = letters.end.map((item, i) => {
        var rest = this.str;
        var beginning = letters.passive && letters.passive[i] || letters.beginning[i];
        while(beginning.indexOf('b') > -1) {
            beginning = beginning.replace('b', rest[0]);
            rest = rest.substring(1); 
        }
        return beginning + rest + item;
    });
    letters = letters.map(item => item.split(''));
    var words = _.zip(letters,vowels).map(function(item) {
      return _.flatten(_.zip(item[0], item[1])).join('');
    })
    this.words.passive = words;
  }
}

export { Table }
