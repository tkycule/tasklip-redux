import React from "react";
import assert from "power-assert";
import { shallow } from "enzyme";
import sinon from "sinon";

import Register from "./Register";

describe("<Register />", () => {
  let wrapper;
  let email;
  let password;
  let passwordConfirmation;
  let register;

  beforeEach(() => {
    register = sinon.spy();
    wrapper = shallow(<Register register={register} />);
    email = wrapper.find("Input[name='email']");
    password = wrapper.find("Input[name='password']");
    passwordConfirmation = wrapper.find("Input[name='password_confirmation']");
  });

  it("should render correctly", () => {
    assert(wrapper.find("form").length === 1);
    assert(email.length === 1);
    assert(password.length === 1);
    assert(wrapper.find("Button[type='submit']").length === 1);
  });

  describe("validations", () => {
    it("should be correctly", () => {
      assert(email.prop("validations") === "isEmail");
      assert.ok(email.prop("required"));
      assert(password.prop("validations") === "minLength:8,maxLength:64");
      assert.ok(password.prop("required"));
      assert(passwordConfirmation.prop("validations") === ("equalsField:password"));
      assert.ok(passwordConfirmation.prop("required"));
    });
  });

  describe("onSubmit", () => {
    it("invokes register", () => {
      wrapper.find("form").simulate("submit", {
        email: "test@example.com",
        password: "password",
      });
      assert.ok(register.calledWith({
        email: "test@example.com",
        password: "password",
      }));
    });
  });
});
