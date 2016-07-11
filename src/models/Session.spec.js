import { expect } from "chai";
import { List } from "immutable";

import Session from "./Session";

describe("Model Session", () => {

  let model;
  beforeEach(() => {
    model = new Session();
  });

  let columns = ["email", "password", "token"];
  columns.forEach((column) => {
    it(`should set ${column}`, () => {
      expect(model.set(column, "some value")).to.have.property(column, "some value");
    });
  });

  describe(".validate", () => {

    context("with valid parameters", () => {
      it("should return null", () => {
        model = model.set("email", "test@example.com");
        model = model.set("password", "password");
        model = model.set("password_confirmation", "password");
        expect(model.validate()).to.be.null;
      });
    });

    context("when email", () => {
      context("is null", () => {
        it("should return errors", () => {
          expect(model.validate()).to.have.property("email");
        });
      });

      context("is invalid format", () => {
        it("should return errors", () => {
          model = model.set("email", "invalid_email");
          expect(model.validate()).to.have.property("email");
        });
      });
    });

    context("when password", () => {
      context("is null", () => {
        it("should return errors", () => {
          expect(model.validate()).to.have.property("password");
        });
      });

      context("lenght is 7", () => {
        it("should return errors", () => {
          model = model.set("password", "1234567");
          expect(model.validate()).to.have.property("password");
        });
      });

      context("lenght is 65", () => {
        it("should return errors", () => {
          model = model.set("password", "12345678901234567890123456789012345678901234567890123456789012345");
          expect(model.validate()).to.have.property("password");
        });
      });
    });

    context("when password_confirmation", () => {
      context("is not match password", () => {
        it("should return errors", () => {
          model = model.set("password", "secret");
          model = model.set("password_confirmation", "invalid");
          expect(model.validate()).to.have.property("password");
        });
      });
    });

  });
});
