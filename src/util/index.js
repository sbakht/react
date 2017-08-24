import Dictionary from './dictionary';
import _ from 'underscore';

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getArabicChars = function () {
  return ['ء', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'];
};

const Root = {
  allowVowel: false,
  randomLetterIndex() {
    return this.allowVowel
      ? getRandomInt(0, 28)
      : getRandomInt(0, 26);
  },
  getRandomChar() {
    const i = this.randomLetterIndex();
    return getArabicChars()[i];
  },
  getRandom() {
    return {
      root1: this.getRandomChar(),
      root2: this.getRandomChar(),
      root3: this.getRandomChar(),
      form: getRandomInt(2, 11),
    };
  },
  addVowels(roots, type) {
    const maadhi = [roots.root1, roots.root2, roots.root3];
    return _.zip(maadhi, Dictionary.verb.simple[type]);
  },
};

const randomProperty = function (obj) {
  const keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

export default {
  getRandomInt,
  getArabicChars,
  Root,
  randomProperty,
};
