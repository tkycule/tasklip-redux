import React from "react";
import assert from "power-assert";
import { shallow } from "enzyme";
import sinon from "sinon";

import List from "models/List";
import ListItem from "./ListItem";

describe("<ListItem />", () => {
  let wrapper;
  let list;
  let updateList;
  let destroyList;

  beforeEach(() => {
    list = new List({
      name: "list 1",
    });
    updateList = sinon.spy();
    destroyList = sinon.spy();
    wrapper = shallow(<ListItem list={list} updateList={updateList} destroyList={destroyList} />);
  });

  it("should render correctly", () => {
    assert(wrapper.find("ListGroupItem").length === 1);
    assert(wrapper.find("InlineEdit").length === 1);
    assert(wrapper.find("InlineEdit").get(0).props.text === "list 1");
    assert(wrapper.find("button").length === 1);
  });

  it("should call updateList when InlineEdit is changed", () => {
    const inlineEdit = wrapper.find("InlineEdit").get(0);
    inlineEdit.props.change({
      name: "edited List 1",
    });

    assert(updateList.calledOnce);
    assert(updateList.calledWith({
      list: list.set("name", "edited List 1"),
    }));
  });
});
