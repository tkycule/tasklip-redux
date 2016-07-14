import { createAction } from "redux-actions";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

export const LOGOUT = "LOGOUT";
export const logout = createAction(LOGOUT);

export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const register = createAction(REGISTER);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE);

export const NOTIFICATION = "NOTIFICATION";
export const notification = createAction(NOTIFICATION);

export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";
export const clearNotification = createAction(CLEAR_NOTIFICATION);
