import superagent from "superagent";
import superagentJsonapify from "superagent-jsonapify";

import User from "models/User";

superagentJsonapify(superagent);

function send(method, url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = superagent[method](__API_URL__ + url)
      .send(options.body)
      .query(options.query)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    const currentUser = User.getCurrentUser();
    if (currentUser) {
      req.set("Authorization", `Bearer ${currentUser.authentication_token}`);
    }

    req.end((err, res) => {
      if (err) {
        if (currentUser && err.status === 401) {
          currentUser.logout();
        }
        reject(err);
      }
      resolve(res);
    });
  });
}

function get(url, query) {
  return send("get", url, {
    query,
  });
}

function post(url, body) {
  return send("post", url, {
    body,
  });
}

function patch(url, body) {
  return send("patch", url, {
    body,
  });
}

function put(url, body) {
  return send("put", url, {
    body,
  });
}

function destroy(url, body) {
  return send("delete", url, {
    body,
  });
}

export default {
  get,
  post,
  patch,
  put,
  destroy,
};
