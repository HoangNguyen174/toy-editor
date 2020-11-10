import * as ShapeDefinitions from '../shapeDefinitions';
import { v4 as uuidv4 } from 'uuid';
import store from '../appState/store';
import * as actions from '../appState/actions';
import * as actionTypes from '../appState/actions/actionTypes';

let shapeCreatorInstance = null;
class ShapeCreator {
  constructor() {
    this.shapeDefinitions = new Map();
    this.shapes = [];
    this.canvas = null;
    this.context = null;
    this.hoveredShapeId = '';
    this.isDragging = false;
    this.isMouseMove = false;
    this.timeout = null;
    this.dragStart = { 
      x: 0,
      y: 0
    };
    this.dragVector = {
      x: 0,
      y: 0
    }; 
    this.initialize();
  }

  initialize() {
    this.loadDefinitions();
    store.subscribe(() => {
      let action = store.getState().action;
      let selectedShape = store.getState().selectedShape;

      if (action === actionTypes.DELETE_SHAPE) {
        this.deleteShape(selectedShape);
      } else if (action === actionTypes.EDIT_SHAPE_PROP) {
        let editProp = store.getState().editProp;
        this.editShape(selectedShape, editProp)
      }

      this.render();
    });
  }

  editShape(shape, { name, newValue } ) {
    if (!shape) return;
    const id = shape.id;
    const indexToEdit = this.shapes.findIndex((shape) => shape.id === id);
    if (indexToEdit > -1) {
      if (name !== 'color' && typeof newValue !== 'object' ) {
        this.shapes[indexToEdit].props[name] = parseFloat(newValue);
      } else {
        this.shapes[indexToEdit].props[name] = newValue;
      }
    }
    store.dispatch(actions.setAction(''));
    store.dispatch(actions.setSelectedShape(this.shapes[indexToEdit]));
  }

  deleteShape(shape) {
    const idToDelete = shape.id;
    const indexToDelete = this.shapes.findIndex((shape) => shape.id === idToDelete);
    if (indexToDelete > -1) {
      this.shapes.splice(indexToDelete, 1);
    }
    store.dispatch(actions.setAction(''));
    store.dispatch(actions.setSelectedShape(null));
  }

  create(shapeName, position) {
    const shapeDef = this.shapeDefinitions.get(shapeName);
    const shapeObj = {
      name: shapeDef.name,
      def: shapeDef,
      id: uuidv4(),
      props: {
        isSelected: false,
      }
    };
    const privateProps = shapeDef.privateProps;
    const isArray = (data) => Object.prototype.toString.call(data) === '[object Array]';
    const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]';

    for (let propName in privateProps) {
      if (isArray(privateProps[propName].value)) {
        shapeObj.props[propName] = [...privateProps[propName].value];
      } else if (isObject(privateProps[propName].value)) {
        if (propName === 'position') {
          shapeObj.props.position = { ...position };
        } else {
          shapeObj.props[propName] = {...privateProps[propName].value};
        }
      } else {
        shapeObj.props[propName] = privateProps[propName].value;
      }

    }

    this.shapes.push(shapeObj);

    this.render();
  }

  getSelectedShape() {
    return this.shapes.filter(shape => shape.props.isSelected);
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let shape of this.shapes) {
      if (shape.id === this.hoveredShapeId) {
        shape.def.sharedMethods.renderOutline.call(shape, this.context, {...shape.props});
      }
      if (shape.props.isSelected) {
        shape.def.sharedMethods.renderSelected.call(shape, this.context, {...shape.props});
      }
      shape.props.path = shape.def.sharedMethods.render.call(shape, this.context, {...shape.props});
    }
  }
  
  onMouseDownHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    let canvasRect = this.canvas.getBoundingClientRect();
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;

    let currentSelectedId = null;

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      const path = shape.props.path;

      if (this.context.isPointInPath(path, x, y)) {
        if (!this.isMouseMove) {
          shape.props.isSelected = !shape.props.isSelected;
        } else {
          shape.props.isSelected = true;
        }
        if (!e.shiftKey && shape.props.isSelected) {
          store.dispatch(actions.setSelectedShape(shape));
          currentSelectedId = shape.id;
          break;
        }
      } 
    }

    if (!currentSelectedId) {
      store.dispatch(actions.deselectShape());
    }

    if (!e.shiftKey) {
      for (let shape of this.shapes) {
        if (shape.id !== currentSelectedId) {
          shape.props.isSelected = false;
        }
      }
    }

    this.isDragging = true;
    this.dragStart = {x, y};

    this.render();
  }

  onMouseMoveHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    this.isMouseMove = true;
    let canvasRect = this.canvas.getBoundingClientRect();
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;
    this.hoveredShapeId = '';

    this.dragVector = {
      x: x - this.dragStart.x,
      y: y - this.dragStart.y
    }

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      const path = shape.props.path;
      if (this.context.isPointInPath(path, x, y)) {
        this.hoveredShapeId = shape.id;
        break;
      }
    }

    if (this.isDragging) {
      for (let shape of this.shapes) {
        if (shape.props.isSelected) {
          shape.props.position.x += this.dragVector.x;
          shape.props.position.y += this.dragVector.y;

          if (!e.shiftKey) {
            let selectedShape = store.getState().selectedShape;
            this.editShape(selectedShape, { name: 'position', newValue: shape.props.position });
          }
        }
      }
    }

    this.render();

    this.dragStart.x = x;
    this.dragStart.y = y;

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => { this.isMouseMove = false }, 100);
  }

  onMouseOutHandler(e) {
    if(!this.isDragging) return;

    e.preventDefault();
    e.stopPropagation();
    
    this.isDragging = false;
  }

  onMouseUpHandler(e) {
    if(!this.isDragging) return;

    e.preventDefault();
    e.stopPropagation();

    this.isDragging = false;
  }

  setupMouseEvents() {
    this.canvas.onmousedown = this.onMouseDownHandler.bind(this);
    this.canvas.onmousemove= this.onMouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.onMouseUpHandler.bind(this);
    this.canvas.onmouseout = this.onMouseOutHandler.bind(this);
  }

  setRenderContext(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.setupMouseEvents();
  }

  loadDefinitions() {
    for (let shape in ShapeDefinitions) {
      const shapeDef = ShapeDefinitions[shape];
      this.shapeDefinitions.set(shapeDef.name.toLowerCase(), shapeDef);
    }
  }
}

function getInstance() {
  if (!shapeCreatorInstance) {
    shapeCreatorInstance = new ShapeCreator();
  }
  return shapeCreatorInstance;
}

export default {
  getInstance,
}
