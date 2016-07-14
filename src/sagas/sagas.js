import { takeEvery } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import { replace } from "react-router-redux";

import * as actions from "actions";
import User from "models/User";
import List from "models/List";

function* login(action) {
  try {
    let user = yield call(User.login, action.payload.email, action.payload.password);
    yield put(replace("/lists"));
    yield put(actions.loginSuccess(user));
    yield put(actions.notification({
      message: "ログインしました"
    }));
  } catch (e) {
    yield put(actions.loginFailure(e));
  }
}

function* register(action) {
  try {
    let user = yield call(User.register, action.payload.email, action.payload.password);
    yield put(actions.replace("/lists"));
    yield put(actions.registerSuccess(user));
  } catch (e) {
    yield put(actions.registerFailure(e));
  }
}

function* fetchLists() {
  try {
    let lists = yield call(List.fetchAll);
    yield put(actions.fetchListsSuccess(lists));
  } catch (e) {
    yield put(actions.fetchListsFailure(e));
  }
}

export default function* rootSaga() {
  yield fork(takeEvery, actions.LOGIN, login);
  yield fork(takeEvery, actions.REGISTER, register);
  yield fork(takeEvery, actions.FETCH_LISTS, fetchLists);
}
