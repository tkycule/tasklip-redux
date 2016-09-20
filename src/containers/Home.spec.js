import React from "react";
import assert from "power-assert";
import { shallow } from "enzyme";

import { Tabs, Tab } from "react-bootstrap";

import { Home } from "./Home";

describe("<Home />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it("should render correctly", () => {
    assert(wrapper.find(Tabs).length === 1);
    assert(wrapper.find(Tab).length === 2);
  });
});
