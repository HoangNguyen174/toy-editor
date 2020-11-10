import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const inputId = uuidv4();

function NumberSlider({ onChangeHandler, value, editField }) {
  const onChange = (event) => {
    onChangeHandler(editField, event);
  }

  return (
    <div className="shape-editor__input">
      <label> {editField} </label> 
      <input key={inputId} type="range" min="0" max="500" onChange={onChange} defaultValue={value} />              
    </div>
  )
}

export default NumberSlider;
