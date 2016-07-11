import { takeEvery, delay } from "redux-saga";
import { put, call } from "redux-saga/effects";

import { LOGIN, loginSuccess } from "actions";

function* login() {
  yield call(delay, 1000);
  yield put(loginSuccess());
}

export default function* rootSaga() {
  yield* takeEvery(LOGIN, login);
}
