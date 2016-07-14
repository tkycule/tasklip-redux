import { takeEvery } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import { replace } from "react-router-redux";

import { LOGIN, loginSuccess, loginFailure, REGISTER, registerSuccess, registerFailure, notification } from "actions";
import User from "models/User";

function* login(action) {
  try {
    let user = yield call(User.login, action.payload.email, action.payload.password);
    yield put(replace("/lists"));
    yield put(loginSuccess(user));
    yield put(notification({
      message: "ログインしました"
    }));
  } catch (e) {
    yield put(loginFailure(e));
  }
}

function* register(action) {
  try {
    let user = yield call(User.register, action.payload.email, action.payload.password);
    yield put(replace("/lists"));
    yield put(registerSuccess(user));
  } catch (e) {
    yield put(registerFailure(e));
  }
}

export default function* rootSaga() {
  yield fork(takeEvery, LOGIN, login);
  yield fork(takeEvery, REGISTER, register);
}
