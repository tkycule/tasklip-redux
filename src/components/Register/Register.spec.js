import React from "react";
import { expect } from "chai";
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
    expect(wrapper.find("form")).to.have.lengthOf(1);
    expect(email).to.have.lengthOf(1);
    expect(password).to.have.lengthOf(1);
    expect(wrapper.find("Button[type='submit']")).to.have.lengthOf(1);
  });

  describe("validations", () => {

    it("should be correctly", () => {
      expect(email.prop("validations")).to.equal("isEmail");
      expect(email.prop("required")).to.be.true;
      expect(password.prop("validations")).to.equal("minLength:8,maxLength:64");
      expect(password.prop("required")).to.be.true;
      expect(passwordConfirmation.prop("validations")).to.equal("equalsField:password");
      expect(passwordConfirmation.prop("required")).to.be.true;
    });
  });

  describe("onSubmit", () => {
    it("invokes register", () => {
      wrapper.find("form").simulate("submit", {
        email: "test@example.com",
        password: "password"
      });
      expect(register.calledWith({
        email: "test@example.com",
        password: "password"
      })).to.be.true;
    });
  });
});
