import React from "react";

const Pager = props => {
  const isFirst = () => {
    return props.qNum === 0;
  };

  const isLast = () => {
    return props.qNum === props.qLen - 1;
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

export default Pager;
