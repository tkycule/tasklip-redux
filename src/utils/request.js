import config from "../../config/default";
import superagent from "superagent";
import superagentJsonapify from "superagent-jsonapify";

import User from "../models/User";

superagentJsonapify(superagent);

function get(url, query) {
  return send("get", url, {
    query: query
  });
}

function post(url, body) {
  return send("post", url, {
    body: body
  });
}

function patch(url, body) {
  return send("patch", url, {
    body: body
  });
}

function put(url, body) {
  return send("put", url, {
    body: body
  });
}

function destroy(url, body) {
  return send("delete", url, {
    body: body
  });
}

function send(method, url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = superagent[method]("http://" + config.api_domain + ":" + config.api_port + "/v1" + url)
      .send(options.body)
      .query(options.query)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    const currentUser = User.getCurrentUser();
    if (currentUser) {
      req.set("Authorization", currentUser.authentication_token);
    }

    req.end((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

export default {
  get,
  post,
  patch,
  put,
  destroy
};
