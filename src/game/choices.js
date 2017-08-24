import React from 'react';

const AnswerChoices = (props) => {
  const { onSelect } = props;

  const onClick = (e) => {
    onSelect(e.target.dataset.type);
  };

  return (
    <div id="answerButtons">
      <div>
        <button onClick={onClick} data-type="past">Past</button>
        <button onClick={onClick} data-type="present">Present</button>
        <button onClick={onClick} data-type="masdr">Masdr</button>
      </div>
      <div>
        <button onClick={onClick} data-type="faail">Faail</button>
        <button onClick={onClick} data-type="mafool">Mafool</button>
      </div>
      <div>
        <button onClick={onClick} data-type="pastP">Passive Past</button>
        <button onClick={onClick} data-type="presentP">Passive Present</button>
      </div>
      <div>
        <button onClick={onClick} data-type="command">Command</button>
        <button onClick={onClick} data-type="forbid">Forbid</button>
        <button onClick={onClick} data-type="tharf">Tharf</button>
      </div>
    </div>
  );
};

AnswerChoices.propTypes = {
  onSelect: React.PropTypes.function,
};

export default AnswerChoices;
