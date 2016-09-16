import { Record } from "immutable";

import request from "utils/request";

const UserRecord = new Record({
  email: null,
  password: null,
  authentication_token: null,
});

export const CURRENT_USER_KEY = "tasklip_current_user";

export default class User extends UserRecord {
  static login(email, password) {
    return request
      .post("/sessions", {
        email,
        password,
      })
      .then((res) => {
        const user = new User(res.body);
        User.setCurrentUser(user);
        return user;
      });
  }

  static setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user.toJSON()));
  }

  static getCurrentUser() {
    if (localStorage.getItem(CURRENT_USER_KEY)) {
      try {
        return new User(JSON.parse(localStorage.getItem(CURRENT_USER_KEY)));
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  static register(email, password) {
    return request
      .post("/users", {
        email,
        password,
      })
      .then((res) => {
        const user = new User(res.body);
        User.setCurrentUser(user);
        return user;
      });
  }
}
