import React from 'react';
import { render } from 'react-dom';
import css from './style.css';
import Practice from './practice';
import Game from './game';
import Quiz from './quiz';
import { MaadhiPicker } from './picker';
import { FilterByName } from './nameMap';
import _ from 'underscore';
import {QuestionBuilder, TableQuestion} from './questionBuilder';

//thulathi mujarrad
//nasara, daraba, sameya, fataha, karoma, haseba

//thualthi mazeedfee

var options = { letters : "فعل", group : "maadhi", type : "type1"}
var questions = Array(50).fill(1).map(function() {
  options.choose = _.random(0,13);
  // options.text = "Pick the plural verb";
  // options.include = ['active', 'passive'];
  var singular = FilterByName.filter("singular").toIndex();
  var dual = FilterByName.filter("dual").toIndex();
  var plural = FilterByName.filter("plural").toIndex();
  var chooseFromCorrect = [options.choose];
  // var chooseFromWrong = dual;
  var chooseFromWrong = singular.concat(dual);
  var picker = new MaadhiPicker({ chooseFromCorrect });
  var table = new TableQuestion(options, picker);
  table.build(options);
  return table.question;
})
console.log(questions);
// var questions = [
// {
//   text: "What is my name?",
//   choices: [
//     { val: maadhi, text: maadhi, isCorrect: true },
//     { val: x1, text: x1, isWrong: true },
//     { val: x2, text: x2, isWrong: true },
//     { val: x3, text: x3, isWrong: true }
//   ]
// },
//   {
//     text: "Who is an adc?",
//     choices: [
//       { val: "a", text: "riven", isWrong: true },
//       { val: "b", text: "zed", isWrong: true },
//       { val: "c", text: "kogmaw", isCorrect: true },
//       { val: "d", text: "janna", isWrong: true }
//     ]
//   },
//   {
//     text: "Who is a mid?",
//     choices: [
//       { val: "a", text: "riven", isWrong: true },
//       { val: "b", text: "zed", isCorrect: true },
//       { val: "c", text: "kogmaw", isWrong: true },
//       { val: "d", text: "janna", isWrong: true }
//     ]
//   }
// ];

// questions = _.shuffle(questions.map(shuffleAnswers));
questions = questions.map(shuffleAnswers);

function shuffleAnswers(question) {
  question.choices = _.shuffle(question.choices);
  return question;
}

// function myAsyncFunction(url) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//     xhr.onload = () => resolve(xhr.responseText);
//     xhr.onerror = () => reject(xhr.statusText);
//     xhr.send();
//   });
// }

// var url = 'https://opentdb.com/api.php?amount=10&type=multiple';

// myAsyncFunction(url).then(function(response) {
//   var json = JSON.parse(response);
//   json.results.map(function(question, i) {
//     var arr = question.incorrect_answers.map(function(w) {
//       return { val : w, text : w, isWrong : true};
//     })
//     var correct = question.correct_answer;
//     arr.push({val : correct , text : correct, isCorrect : true})
//     questions.push( {
//       text: question.question,
//       choices : arr
//     });
//     console.log(questions);
//     render(<App />, document.getElementById("demo"));
//   })
// })

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Quiz questions={questions} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
