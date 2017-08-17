import React from "react";

class Table extends React.Component {
  render() {
    var grammar = this.props.grammar;
    return (
      <div>
        <table>
          <thead>
            <tr>Fil</tr>
            <tr>Mudari</tr>
            <tr>Masdr</tr>
            <tr>Faail</tr>
          </thead>
          <tbody>
            <Active grammar={grammar} />
            <Passive grammar={grammar} />
          </tbody>
        </table>
        <Command grammar={grammar} />
      </div>
    );
  }
}

class Active extends React.Component {
  render() {
    var grammar = this.props.grammar;
    return (
      <tr id="active">
        <td>
          {grammar.past}
        </td>
        <td>
          {grammar.present}
        </td>
        <td>
          {grammar.masdr}
        </td>
        <td>
          {grammar.faail}
        </td>
      </tr>
    );
  }
}

class Passive extends React.Component {
  render() {
    if (this.props.grammar.hasPassive) {
      return (
        <tr id="passive">
          <td>
            {this.props.grammar.pastP}
          </td>
          <td>
            {this.props.grammar.presentP}
          </td>
          <td>
            {this.props.grammar.masdr}
          </td>
          <td>
            {this.props.grammar.mafool}
          </td>
        </tr>
      );
    } else {
      return <div>NO PASSIVE</div>;
    }
  }
}

class Command extends React.Component {
  render() {
    var grammar = this.props.grammar;
    return (
      <table>
        <tr id="command">
          <td>
            {grammar.command}
          </td>
          <td>
            {grammar.forbid}
          </td>
          <td>
            {grammar.tharf}
          </td>
        </tr>
      </table>
    );
  }
}

export default Table;
