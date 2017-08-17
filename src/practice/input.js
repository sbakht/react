import React from "react";
import Util from "../util";

class Input extends React.Component {
  renderOption(item, i) {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  }

  render() {
    return (
      <div id="roots">
        <div>
          1st Root letter
          <SelectLetter
            id="root1"
            value={this.props.roots.root1}
            onChange={this.props.onChange}
          />
        </div>
        <div>
          2nd Root letter
          <SelectLetter
            id="root2"
            value={this.props.roots.root2}
            onChange={this.props.onChange}
          />
        </div>
        <div>
          3rd Root letter
          <SelectLetter
            id="root3"
            value={this.props.roots.root3}
            onChange={this.props.onChange}
          />
        </div>
        <div id="familyNumber">
          Select the Family
          <select
            id="form"
            value={this.props.roots.form}
            onChange={this.onChange}
          >
            <option value="2">II - تفعيل</option>
            <option value="3">III - فعال</option>
            <option value="4">IV - إفعال</option>
            <option value="5">V - تفعل</option>
            <option value="6">VI - تفاعل</option>
            <option value="7">VII - انفعال</option>
            <option value="8">VIII - افتعال</option>
            <option value="9">IX - افعلال</option>
            <option value="10">X - استفعال</option>
          </select>
        </div>
      </div>
    );
  }
}

const SelectLetter = props => {
  const onChange = e => {
    props.onChange(e.target.id, e.target.value);
  };

  const options = Util.getArabicChars().map(function(item) {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  const { id, value } = props;

  return (
    <select id={id} value={value} onChange={onChange}>
      {options}
    </select>
  );
};

export default Input;
