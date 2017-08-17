import Dictionary from './dictionary';
import _ from 'underscore';

const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getArabicChars = function() {
  return ["ء","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"];
}

const Root = {
  allowVowel : false,
  randomLetterIndex : function() {
    return this.allowVowel
      ? getRandomInt(0, 28)
      : getRandomInt(0, 26);
  },
  getRandomChar : function() {
    var i = this.randomLetterIndex();
    return getArabicChars()[i];
  },
  getRandom : function() {
    return {
      root1: this.getRandomChar(),
      root2: this.getRandomChar(),
      root3: this.getRandomChar(),
      form: getRandomInt(2, 11)
    };
  },
  toVerb : function(roots, type) {
    var maadhi = [roots.root1, roots.root2, roots.root3];
    return _.zip(maadhi, Dictionary.verb.simple[type])
  }
};

var randomProperty = function(obj) {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

export default {
  getRandomInt: getRandomInt,
  getArabicChars: getArabicChars,
  Root: Root,
  randomProperty : randomProperty
};
