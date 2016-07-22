import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import "font-awesome/css/font-awesome.css";
import "styles/application.sass";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

require("react-tap-event-plugin")();

import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { routerReducer, routerMiddleware, syncHistoryWithStore } from "react-router-redux";

import App from "containers/App/App";
import Home from "containers/Home/Home";
import Lists from "containers/Lists/Lists";
import List from "containers/Lists/List";
import EditTask from "containers/EditTask/EditTask";
import ConfigLists from "containers/ConfigLists/ConfigLists";
import User from "models/User";

import rootSaga from "sagas/sagas";
import * as reducers from "reducers";

import moment from "moment";
moment.locale("ja");

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSaga);

function guestOnly(nextState, replace) {
  if (User.getCurrentUser() != null) {
    replace("/lists");
  }
}

function userOnly(nextState, replace) {
  if (User.getCurrentUser() == null) {
    replace("/");
  }
}

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} onEnter={guestOnly} />
          <Route path="lists" component={Lists} onEnter={userOnly}>
            <Route path="_config_" component={ConfigLists} />
            <Route path=":listId/tasks" component={List} />
            <Route path=":listId/tasks/:taskId/edit" component={EditTask} />
          </Route>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector("#root")
);
