import React from "react";
import { expect } from "chai";
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
    expect(wrapper.find("form")).to.have.lengthOf(1);
    expect(wrapper.find("Input[name='email']")).to.have.lengthOf(1);
    expect(wrapper.find("Input[name='password']")).to.have.lengthOf(1);
    expect(wrapper.find("Button[type='submit']")).to.have.lengthOf(1);
  });

  describe("validations", () => {

    it("should be correctly", () => {
      expect(email.prop("validations")).to.equal("isEmail");
      expect(email.prop("required")).to.be.true;
      expect(password.prop("validations")).to.equal("minLength:8,maxLength:64");
      expect(password.prop("required")).to.be.true;
    });
  });

  describe("onSubmit", () => {
    it.only("invokes login", () => {
      wrapper.find("form").simulate("submit", {
        email: "test@example.com",
        password: "password"
      });
      expect(login.calledWith({
        email: "test@example.com",
        password: "password"
      })).to.be.true;
    });
  });
});
