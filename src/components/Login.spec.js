import React from "react";
import assert from "power-assert";
import { shallow } from "enzyme";
import sinon from "sinon";

import Login from "./Login";

describe("<Login />", () => {
  let wrapper;
  let email;
  let password;
  let login;

  beforeEach(() => {
    login = sinon.spy();
    wrapper = shallow(<Login login={login} />);
    email = wrapper.find("Input[name='email']");
    password = wrapper.find("Input[name='password']");
  });

  it("should render correctly", () => {
    assert(wrapper.find("form").length === 1);
    assert(email.length === 1);
    assert(password.length === 1);
    assert(wrapper.find("Button[type='submit']").length === 1);
  });

  describe("validations", () => {
    it("should be correctly", () => {
      assert.equal(email.prop("validations"), "isEmail");
      assert.ok(email.prop("required"));
      assert.equal(password.prop("validations"), "minLength:8,maxLength:64");
      assert.ok(password.prop("required"));
    });
  });

  describe("onSubmit", () => {
    it("invokes login", () => {
      wrapper.find("form").simulate("submit", {
        email: "test@example.com",
        password: "password",
      });
      assert.ok(login.calledWith({
        email: "test@example.com",
        password: "password",
      }));
    });
  });
});
