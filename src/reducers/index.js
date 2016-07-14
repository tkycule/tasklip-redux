import * as actions from "actions";
import User from "models/User";

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

export function lists(state = [], action) {
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
  return state;
}
