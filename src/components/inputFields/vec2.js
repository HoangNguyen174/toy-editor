import React from 'react';

function Vec2({ value }) {
  return (
    <div className="shape-editor__input">
      <div className="shape-editor__input__pos">
        <label> center x: </label> <b> { value.x.toFixed(0) } </b>
      </div>
      <div className="shape-editor__input__pos">
        <label> center y: </label> <b> { value.y.toFixed(0) } </b>
      </div>
    </div>
  )
}

export default Vec2;
