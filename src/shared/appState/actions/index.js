import * as actionTypes from './actionTypes';

export const setSelectedShape = (shape) => {
  return {
    type: actionTypes.SET_SELECTED_SHAPE,
    payload: {
      shape
    }
  }
}

export const deselectShape = (shape) => {
  return {
    type: actionTypes.DESELECT_SHAPE,
    payload: {}
  }
}

export const deleteShape = () => {
  return {
    type: actionTypes.DELETE_SHAPE,
    payload: {}
  }
}

export const editShapeProp = (propName, newValue) => {
  return {
    type: actionTypes.EDIT_SHAPE_PROP,
    payload: {
      propName,
      newValue
    }
  }
}

export const setAction = (action) => {
  return {
    type: actionTypes.SET_ACTION,
    payload: {
      action
    }
  }
}