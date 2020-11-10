import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../shared/appState/actions';
import * as actionTypes from '../shared/appState/actions/actionTypes';
import './shapeEditor.scss';

import FieldFactory from './inputFields/fieldFactory';

function ShapeEditor({selectedShapePosition, selectedShape, deleteShape, editShape}) {

  const handleShapePropChange = (key, event) => {
    const newValue = event.target.value;
    editShape(key, newValue);
  }

  const deleteSelectedShape = () => {
    deleteShape();
  }

  const editor = () => {
    if (!selectedShape) return '';

    const createShapePropsEditor = (type) => {
      let inputs = [];
      for (const [key, value] of Object.entries(selectedShape.def.privateProps)) {
        const fieldType = value.type;
        inputs.push((
          <FieldFactory
            onChangeHandler={handleShapePropChange}
            value={selectedShape.props[key]}
            editField={key}
            fieldType={fieldType}/>
        ));
      }
      return inputs;
    }

    return (
      <div className="shape-editor">
        <div className="shape-editor__header">
          <button onClick={deleteSelectedShape}> 	&#128465; </button> {selectedShape.name}
        </div>
        {createShapePropsEditor()}
      </div>
    )
  }

  return editor();
}

const mapStateToProps = state => ({ 
  selectedShape: state.selectedShape,
  selectedShapePosition: state.selectedShape?.props?.position 
});

const mapDispatchToProps = dispatch => {
  return {
    deleteShape: () => dispatch(actions.setAction(actionTypes.DELETE_SHAPE)),
    editShape: (propName, newValue) => {
      dispatch(actions.setAction(actionTypes.EDIT_SHAPE_PROP));
      dispatch(actions.editShapeProp(propName, newValue));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShapeEditor);
