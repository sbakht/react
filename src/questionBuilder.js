import _ from "underscore";
import Generator from "./generator";
import Util from "./util";

function buildChoice(val, isCorrect) {
  if (isCorrect) {
    return { val: val, text: val, isCorrect: true };
  }
  return { val: val, text: val, isWrong: true };
}

function pluckMany(obj, arr) {
  var result = {};
  arr.forEach(function(item) {
    result[item] = obj[item];
  });
  return result;
}

function buildWrongChoices(gen, pick) {
  return Array(3)
    .fill(1)
    .map(function() {
      return _.sample(pluckMany(gen.word, pick), 1);
    })
    .map(function(wrong) {
      return buildChoice(wrong, false);
    });
}

function buildCorrectChoice(roots, type) {
  var maadhi = Util.Root.toVerb(roots, type);
  return { val: maadhi, text: maadhi, isCorrect: true };
}

function maadhiQ(num, pick, type) {
  return Array(num).fill(1).map(function() {
    var roots = Util.Root.getRandom(3);
    var gen = Generator(roots, false);

    var choices = buildWrongChoices(gen, pick).concat(buildCorrectChoice(roots, type))
    return {
      text: "Which is the 3rd person masculine maadhi?",
      choices: choices
    };
  });
}

export default {
  maadhiQ: maadhiQ
};

