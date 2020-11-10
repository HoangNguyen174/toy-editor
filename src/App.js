import './App.css';
import React, { useEffect } from 'react';
import shapeCreatorService from './shared/services/shapeCreator';
import ShapeEditor from './components/shapeEditor';

import canvasToImage from 'canvas-to-image';
import { Provider } from 'react-redux';
import store from './shared/appState/store';

function App() {
  const shapeCreatorInstance = shapeCreatorService.getInstance();

  useEffect(() => {
    const canvas = document.getElementById('myCanvas');
    shapeCreatorInstance.setRenderContext(canvas);
  });

  const createRenderButtons = () => {
    const shapeDefs = shapeCreatorInstance.shapeDefinitions;
    let buttons = [];
    for (let [, value] of shapeDefs) {
      let shapeName = value.name;
      let defaultPos = {
        x: 250,
        y: 250
      }
      const ele = (<button key={shapeName} onClick={() => { shapeCreatorInstance.create(shapeName, defaultPos);}}> Create {value.name} </button>);
      buttons.push(ele);
    }
    return buttons;
  }

  const saveCanvasAsImage = () => {
    canvasToImage('myCanvas', {
      name: 'toyImage',
      type: 'png',
      quality: 1
    })
  }

  return (
    <Provider store={store}>
      <div className="App">
        <div className="editor">
          <div className="render-btns">
            {createRenderButtons()}
            <button onClick={saveCanvasAsImage} > Save as Image </button> 
          </div>
          <canvas id="myCanvas" width="500" height="500" style={{border: '1px solid black'}}>
          </canvas>
          <div className="shape-properties-editor">
            <ShapeEditor />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
