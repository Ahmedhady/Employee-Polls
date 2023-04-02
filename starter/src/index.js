import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reducer from "./reducers";
import middleware from './middleware';

const store = createStore(reducer,
  compose(
    middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>
  //,document.getElementById("root")
  );

  // header
  // => content[changeble]
  //footer 