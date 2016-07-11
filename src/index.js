import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import reducer from "reducers";

import "font-awesome/css/font-awesome.css";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

require("react-tap-event-plugin")();

import App from "containers/App/App";
import Home from "containers/Home/Home";

import rootSaga from "sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Home />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector("#root")
);
