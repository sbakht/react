import React from 'react';
import PropTypes from 'prop-types';

class Choice extends React.Component {
  onAnswer() {
    this.props.onClick(this.props.choice);
  }

  getClass() {
    const arr = ['choice'];
    this.props.isSelected ? arr.push('selected') : '';
    return arr.join(' ');
  }

  componentDidUpdate(){
    if(this.props.isSelected) {
      this.nameInput.focus(); 
    }
  }

  render() {
    const { choice, isSelected, ith} = this.props;
    return (
      <label className={this.getClass()}>
        <input
          type="radio"
          name="choices"
          onClick={this.onAnswer.bind(this)}
          checked={isSelected}
          ref={(input) => { this.nameInput = input; }} 
        />
        {ith && <span className="number">{ith}.</span>}{choice.text}
      </label>
    );
  }
};

Choice.propTypes = {
  choice: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Choice;
