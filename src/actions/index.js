import { createAction } from "redux-actions";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
