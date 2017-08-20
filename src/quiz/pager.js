import React from "react";
import PropTypes from "prop-types";

const Pager = props => {
  const isFirst = () => {
    return props.qNum === 1;
  };

  const isLast = () => {
    return props.qNum === props.qLen;
  };

  return (
    <div>
      <nav>
        <ul>
          {!isFirst() &&
            <li>
              <a href="#" onClick={props.onPrev}>
                Previous
              </a>
            </li>}

          {!isLast() &&
            <li>
              <a href="#" onClick={props.onNext}>
                Next
              </a>
            </li>}
        </ul>
      </nav>
      <div>
        {isLast() &&
          <button type="button" onClick={props.showResults}>
            Results
          </button>}
      </div>
    </div>
  );
};

Pager.propTypes = {
  qNum : PropTypes.number.isRequired,
  qLen : PropTypes.number.isRequired,
  onPrev : PropTypes.func.isRequired,
  onNext : PropTypes.func.isRequired,
  showResults : PropTypes.func
}

export default Pager;
