import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

import { Tabs, Tab } from "react-bootstrap";

import { Home } from "./Home";

describe("<Home />", () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it("should render correctly", () => {
    expect(wrapper.find(Tabs)).to.have.lengthOf(1);
    expect(wrapper.find(Tab)).to.have.lengthOf(2);
  });
});
