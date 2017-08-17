import React from "react";
import Table from "./table";
import Input from "./input";
import Generator from "../generator";
import Util from "../util";

class Practice extends React.Component {
  constructor() {
    super();
    this.state = {
      allowVowel: false,
      grammar: {},
      random: true,
      roots: {
        root1: "ء",
        root2: "ء",
        root3: "ء",
        form: 2
      }
    };
    this.generate = this.generate.bind(this);
  }
  
  randomLetterIndex() {
    return this.state.allowVowel ? Util.getRandomInt(0, 28) : Util.getRandomInt(0, 26);
  }

  getRandomChar() {
    var i = this.randomLetterIndex();
    return Util.getArabicChars()[i];
  }
  
  setRoot(id, val) {
    var roots = this.state.roots;
    roots[id] = val;
    this.setState({ roots : roots });
  }
  
  randomizeRoots() {
    this.setRoot("root1", this.getRandomChar());
    this.setRoot("root2", this.getRandomChar());
    this.setRoot("root3", this.getRandomChar());
    this.setRoot("form", Util.getRandomInt(2, 11));
  }
  
  generate() {
    this.state.random && this.randomizeRoots();
    this.setState({
      grammar: Generator(this.state.roots, false)
    });
  }

  render() {
    return (
      <div>
        <Input roots={this.state.roots} onChange={this.setRoot} />
        <button id="generate" onClick={this.generate}>
          Generate Sarf Table
        </button>
        {!!Object.keys(this.state.grammar).length && <Table grammar={this.state.grammar} />}
      </div>
    );
  }
}

export default Practice;
