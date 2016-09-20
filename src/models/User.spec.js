import assert from "power-assert";
import sinon from "sinon";
import User, { CURRENT_USER_KEY } from "./User";

const mock = require("superagent-mocker")(require("superagent"));

describe("Model User", () => {
  let model;
  beforeEach(() => {
    model = new User();
  });

  const columns = ["email", "password", "authentication_token"];
  columns.forEach((column) => {
    it(`should set ${column}`, () => {
      assert.equal(model.set(column, "some value").get(column), "some value");
    });
  });

  describe(".login", () => {
    const url = `${__API_URL__}/sessions`;

    context("with valid parameter", () => {
      beforeEach(() => {
        mock.post(url, () => ({
          body: {
            email: "test@example.com",
          },
        }));
        sinon.spy(User, "setCurrentUser");
      });

      it("returns user", (done) => {
        User
          .login("test@example.com", "password")
          .then((user) => {
            assert.equal(user.email, "test@example.com");
            assert.ok(User.setCurrentUser.calledOnce);
          })
          .then(done).catch(done);
      });
    });

    context("with invalid parameter", () => {
      beforeEach(() => {
        mock.post(url, () => ({
          status: 401,
        }));
      });

      it("returns 401", (done) => {
        User
          .login("test@example.com", "invalid")
          .catch((err) => {
            assert(err.status === 401);
            done();
          })
          .then(() => done("error")).catch(done);
      });
    });
  });

  describe("setCurrentUser", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should set localStorage", () => {
      const user = new User({
        email: "test@example.com",
      });

      assert.ok(!localStorage[CURRENT_USER_KEY]);
      User.setCurrentUser(user);
      assert.equal(localStorage[CURRENT_USER_KEY], JSON.stringify(user.toJSON()));
    });
  });

  describe("getCurrentUser", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should return user", () => {
      const user = new User({
        email: "test@example.com",
      });

      assert(User.getCurrentUser() === null);
      localStorage[CURRENT_USER_KEY] = JSON.stringify(user.toJSON());
      assert.deepEqual(User.getCurrentUser().toJS(), user.toJS());
    });
  });

  describe("#logout", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should clear localStorage", () => {
      const user = new User({
        email: "test@example.com",
      });

      localStorage[CURRENT_USER_KEY] = JSON.stringify(user.toJSON());
      user.logout();
      assert(localStorage[CURRENT_USER_KEY] === undefined);
    });
  });
});
