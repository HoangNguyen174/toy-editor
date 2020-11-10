import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const inputId = uuidv4();

function Color({ onChangeHandler, value, editField }) {
  const onChange = (event) => {
    onChangeHandler(editField, event);
  }

  return (
    <div className="shape-editor__input">
      <label> Color </label>
      <input key={inputId} type="color" 
        onChange={onChange} 
        value={value} />
    </div>
  )
}

export default Color;
