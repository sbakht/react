import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import css from './style.css';
import Table from './table/index';
import Game from './game';
import Quiz from './quiz';
import { MaadhiPicker, MudariPicker } from './picker';
import { FilterByName } from './nameMap';
import _ from 'underscore';
import {QuestionBuilder, TableQuestion} from './questionBuilder';

//thulathi mujarrad
//nasara, daraba, sameya, fataha, karoma, haseba

//thualthi mazeedfee

// var options = { letters : "ضرب", group : "mudari", type : "type2"}
// var questions = Array(10).fill(1).map(function() {
//   options.choose = _.random(0,13);
//   options.text = "Pick the plural verb";
//   // options.include = ['active', 'passive'];
//   var singular = FilterByName.filter("singular").toIndex();
//   var dual = FilterByName.filter("dual").toIndex();
//   var plural = FilterByName.filter("plural").toIndex();
//   // var chooseFromCorrect = [options.choose];
//   var chooseFromCorrect = singular;
//   // var chooseFromWrong = dual;
//   var chooseFromWrong = plural.concat(dual);
//   var picker = new MudariPicker({ chooseFromCorrect, chooseFromWrong });
//   var table = new TableQuestion(options, picker);
//   table.build(options);
//   return table.question;
// })
var options = { letters : "كرم", group : "mudari", type : "type1", 
                advanced: true, 
                include: ['active','passive'],
                includeGroup: ['maadhi', 'mudari']
              }
var questions = Array(10).fill(1).map(function() {
  options.choose = _.random(0,13);
  options.text = "Pick the plural verb";
  // options.include = ['active', 'passive'];
  var singular = FilterByName.filter("singular").toIndex();
  var dual = FilterByName.filter("dual").toIndex();
  var plural = FilterByName.filter("plural").toIndex();
  // var chooseFromCorrect = [options.choose];
  var chooseFromCorrect = singular;
  // var chooseFromWrong = dual;
  var chooseFromWrong = plural.concat(dual);
  var picker = new MudariPicker({ chooseFromCorrect, chooseFromWrong : plural});
  var maadhi = new MaadhiPicker({ chooseFromCorrect, chooseFromWrong : dual})
  var table = new TableQuestion(options, null, maadhi, picker);
  table.build(options);
  return table.question;
})
console.log(questions);

// questions = _.shuffle(questions.map(shuffleAnswers));
questions = questions.map(shuffleAnswers);

function shuffleAnswers(question) {
  question.choices = _.shuffle(question.choices);
  return question;
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <nav>
          <Link to="/">Game</Link>
          <Link to="/table">Table</Link>
        </nav>
        <Route path="/" exact={true} render={props => (
          <Quiz questions={questions} />
        )}/>
        <Route path="/table" component={Table} />
      </div>
    );
  }
}

render( <BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
