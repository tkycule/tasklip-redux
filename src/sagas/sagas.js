import { takeEvery } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import { replace } from "react-router-redux";

import * as actions from "actions";
import User from "models/User";
import List from "models/List";
import Task from "models/Task";

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
    yield put(actions.notification({
      message: "ログインに失敗しました",
      type: "error"
    }));
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

function* fetchTask(action) {
  try {
    let task = yield call(Task.fetch, action.payload);
    yield put(actions.fetchTaskSuccess(task));
  } catch (e) {
    yield put(actions.fetchTaskFailure(e));
  }
}

function* fetchTasks(action) {
  try {
    let tasks = yield call(Task.fetchAll, action.payload);
    yield put(actions.fetchTasksSuccess(tasks));
  } catch (e) {
    yield put(actions.fetchTasksFailure(e));
  }
}

function* addTask(action) {
  try {
    let task = yield call(action.payload.task.save.bind(action.payload.task));
    if (typeof action.payload.onSuccess == "function") {
      action.payload.onSuccess();
    }
    yield put(actions.addTaskSuccess(task));
    yield put(actions.fetchLists());
  } catch (e) {
    yield put(actions.addTaskFailure(e));
  }
}

function* updateTask(action) {
  try {
    let task = yield call(action.payload.task.save.bind(action.payload.task));
    yield put(actions.updateTaskSuccess(task));
    yield put(actions.fetchLists());

    if (action.payload.notification) {
      yield put(actions.notification({
        message: "更新しました"
      }));
    }

    if (typeof action.payload.onSuccess == "function") {
      action.payload.onSuccess();
    }
  } catch (e) {
    yield put(actions.updateTaskFailure(e));
  }
}

function* destroyTask(action) {
  try {
    yield call(action.payload.task.destroy.bind(action.payload.task));
    yield put(actions.destroyTaskSuccess(action.payload.task));
    yield put(actions.fetchLists());
  } catch (e) {
    yield put(actions.destroyTaskFailure(e));
  }
}

function* addList(action) {
  try {
    let list = yield call(action.payload.list.save.bind(action.payload.list));
    if (typeof action.payload.onSuccess == "function") {
      action.payload.onSuccess();
    }
    yield put(actions.addListSuccess(list));
    yield put(actions.fetchLists());
    yield put(actions.notification({
      message: "リストを追加しました"
    }));
  } catch (e) {
    yield put(actions.addListFailure(e));
  }
}

function* destroyList(action) {
  try {
    yield call(action.payload.list.destroy.bind(action.payload.list));
    yield put(actions.destroyListSuccess(action.payload.list));
    yield put(actions.fetchLists());
    yield put(actions.notification({
      message: "リストを削除しました"
    }));
  } catch (e) {
    yield put(actions.destroyListFailure(e));
  }
}

function* updateList(action) {
  try {
    let list = yield call(action.payload.list.save.bind(action.payload.list));
    yield put(actions.updateListSuccess(list));
    yield put(actions.fetchLists());

    yield put(actions.notification({
      message: "更新しました"
    }));

  } catch (e) {
    yield put(actions.updateListFailure(e));
  }
}

export default function* rootSaga() {
  yield fork(takeEvery, actions.LOGIN, login);
  yield fork(takeEvery, actions.REGISTER, register);
  yield fork(takeEvery, actions.FETCH_LISTS, fetchLists);
  yield fork(takeEvery, actions.FETCH_TASK, fetchTask);
  yield fork(takeEvery, actions.FETCH_TASKS, fetchTasks);
  yield fork(takeEvery, actions.ADD_TASK, addTask);
  yield fork(takeEvery, actions.UPDATE_TASK, updateTask);
  yield fork(takeEvery, actions.DESTROY_TASK, destroyTask);
  yield fork(takeEvery, actions.ADD_LIST, addList);
  yield fork(takeEvery, actions.DESTROY_LIST, destroyList);
  yield fork(takeEvery, actions.UPDATE_LIST, updateList);
}
