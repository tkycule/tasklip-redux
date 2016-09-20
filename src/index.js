import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import "font-awesome/css/font-awesome.css";
import "styles/application.sass";

import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { routerReducer, routerMiddleware, syncHistoryWithStore } from "react-router-redux";

import moment from "moment";
import BigCalendar from "react-big-calendar";
import "bootstrap/dist/css/bootstrap.css";
import "react-datetime/css/react-datetime.css";
import "fullcalendar/dist/fullcalendar.css";

import App from "containers/App";
import Home from "containers/Home";
import Lists from "containers/Lists";
import List from "containers/List";
import EditTask from "containers/EditTask";
import ConfigLists from "containers/ConfigLists";
import Calendar from "containers/Calendar";
import User from "models/User";

import rootSaga from "sagas/sagas";
import * as reducers from "reducers";

moment.locale("ja");
BigCalendar.momentLocalizer(moment);
require("react-tap-event-plugin")();

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(routerMiddleware(hashHistory), sagaMiddleware),
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

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} onEnter={guestOnly} />
        <Route path="lists" component={Lists} onEnter={userOnly}>
          <Route path="config" component={ConfigLists} />
          <Route path="calendar" component={Calendar} />
          <Route path=":listId/tasks" component={List} />
          <Route path=":listId/tasks/:taskId/edit" component={EditTask} />
        </Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector("#root")
);
