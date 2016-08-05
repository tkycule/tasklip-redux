import * as actions from "actions";
import User from "models/User";
import { List } from "immutable";

export function currentUser(state = User.getCurrentUser(), action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
    case actions.REGISTER_SUCCESS:
      return action.payload;
    case actions.LOGOUT:
      return null;
  }
  return state;
}

export function lists(state = List(), action) {
  switch (action.type) {
    case actions.FETCH_LISTS_SUCCESS:
      return action.payload;
    case actions.ADD_LIST_SUCCESS:
      return state.unshift(action.payload);
    case actions.DESTROY_LIST_SUCCESS:
      return state.filter((list) => list.id !== action.payload.id);
  }
  return state;
}

export function tasks(state = List(), action) {
  switch (action.type) {
    case actions.FETCH_TASKS_SUCCESS:
      return action.payload;
    case actions.ADD_TASK_SUCCESS:
      return state.unshift(action.payload);
    case actions.UPDATE_TASK_SUCCESS:
      return state.map((task) => task.id == action.payload.id ? action.payload : task);
    case actions.DESTROY_TASK_SUCCESS:
      return state.filter((task) => task.id !== action.payload.id);
  }
  return state;
}

export function task(state = null, action) {
  switch (action.type) {
    case actions.FETCH_TASK_SUCCESS:
      return action.payload;
    case actions.UPDATE_TASK_SUCCESS:
      return null;
  }
  return state;
}

export function calenderEvents(state = null, action) {
  switch (action.type) {
    case actions.FETCH_CALENDAR_EVENTS_SUCCESS:
      return action.payload;
  }
  return state;
}

const notificationIntialState = {
  message: null
};

export function notification(state = notificationIntialState, action) {
  switch (action.type) {
    case actions.NOTIFICATION:
      return action.payload;
    case actions.CLEAR_NOTIFICATION:
      return notificationIntialState;
  }

  if (action.error) {
    console.error(action.payload);
    return {
      message: action.payload.response.text,
      type: "danger"
    };
  }
  return state;
}
