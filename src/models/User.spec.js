import { expect } from "chai";
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
      expect(model.set(column, "some value")).to.have.property(column, "some value");
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
            expect(user.email).to.equal("test@example.com");
            expect(User.setCurrentUser.calledOnce).to.be.true();
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
            expect(err.status).to.equal(401);
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

      expect(localStorage[CURRENT_USER_KEY]).to.be.not.ok();
      User.setCurrentUser(user);
      expect(localStorage[CURRENT_USER_KEY]).to.deep.equal(JSON.stringify(user.toJSON()));
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

      expect(User.getCurrentUser()).to.be.null();
      localStorage[CURRENT_USER_KEY] = JSON.stringify(user.toJSON());
      expect(User.getCurrentUser()).to.equal(user);
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
      expect(localStorage[CURRENT_USER_KEY]).to.be.undefined();
    });
  });
});
