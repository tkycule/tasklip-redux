import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import { ListGroupItem } from "react-bootstrap";

import InlineEdit from "react-edit-inline";

export default class ListItem extends React.Component {
  static propTypes = {
    list: ImmutablePropTypes.record.isRequired,
    destroyList: React.PropTypes.func.isRequired,
    updateList: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onNameChange = ::this.onNameChange;
    this.onDestroyClick = ::this.onDestroyClick;
  }

  onDestroyClick() {
    if (window.confirm("Are you sure?")) {
      this.props.destroyList({
        list: this.props.list,
      });
    }
  }

  onNameChange(data) {
    this.props.updateList({
      list: this.props.list.set("name", data.name),
    });
  }

  render() {
    const inlineEdit = (
    <InlineEdit
      text={this.props.list.name}
      paramName="name"
      change={this.onNameChange}
      style={{ padding: "5px", fontSize: "inherit", width: "100%" }} />
    );
    return (
      <ListGroupItem style={{ display: "flex", alignItems: "center" }}>
        {inlineEdit}
        <button onClick={this.onDestroyClick}>
          <i style={{ marginLeft: "auto", cursor: "pointer" }} className="fa fa-remove" />
        </button>
      </ListGroupItem>
      );
  }
}
