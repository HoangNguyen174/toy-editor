import React from 'react';
import Color from './color';
import Vec2 from './vec2';
import NumberSlider from './numberSlider';

function FieldFactory({ fieldType, onChangeHandler, value, editField }) {
  switch(fieldType) {
    case 'Color':
      return (
        <Color 
          onChangeHandler={onChangeHandler} 
          value={value} 
          editField={editField}/>
      )
    case 'Vec2':
      return (
        <Vec2 value={value} />
      )
    case 'NumberSlider':
      return (
        <NumberSlider
          onChangeHandler={onChangeHandler} 
          value={value} 
          editField={editField}/>
      )
    default:
      return null;
  }
}

export default FieldFactory;