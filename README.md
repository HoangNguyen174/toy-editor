## How to run App

Checkout dev branch

Run following commands:

npm i
npm run start

The app will runs at http://localhost:3000 by default

Write out a short plan for what you would need to change / add to your program to support the following features

1. localStorage based persistence
  I already setup Redux store to keep track of some of the app states. To add support for localStorage, we can do the following
  - implement abstract PersistanceStore class that wraps around localstorage interface so in the future we can swap it with something else
  - connect redux store with PersistanceStore class. Most of events in this app are triggered by redux action. We can pick and choose what we want to write into localstorage 
  - Need to also change how we load initial data. First if there is something in the localstorage, populating app based on those value, otherwise load app by default values
  - we will run into issue with supporting multiple tabs. For multiple tabs, we can use sessionStorage instead

2. undo/redo
  - We can do this with redux by creating three arrays, future - current - past to store app state at any given time. 
  - For example to handle undo, we can remove that last state from path array, set the current array we removed from past array, insert the old current state at the start of the future stack. Vice versa for Reo.
  - For any other actions, we can insert current state at the end of past arry. Set the present to new state after the action. Then clear the future
  - For non-redux implementation, we can use Command pattern to simulate undo/redo.

3. save to image
  - I use canvas2image npm package to save to image
  - or I can use canvas native method toDataUrl 

