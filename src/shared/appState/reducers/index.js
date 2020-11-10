import initialState from '../initialState';
import * as actionTypes from '../actions/actionTypes';

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SHAPE: 
      const shape = action.payload.shape;
      if (!shape) return state;
      return {
        ...state,
        selectedShape: {
          ...shape,
          props: {
            ...shape.props,
            position: {
              ...shape.props.position
            }
          }
        }
      }
    case actionTypes.DESELECT_SHAPE:
      return {
        ...state,
        selectedShape: null,
      };
    case actionTypes.SET_ACTION:
      return {
        ...state,
        action: action.payload.action
      }
    case actionTypes.EDIT_SHAPE_PROP:
      return {
        ...state,
        editProp: {
          name: action.payload.propName,
          newValue: action.payload.newValue
        }
      }
    default:
      return state
  }
}