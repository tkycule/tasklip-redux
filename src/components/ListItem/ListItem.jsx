import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import { ListGroupItem } from "react-bootstrap";
import { ListItem as UIListItem } from "material-ui/List";
import IconButton from "material-ui/IconButton";

import InlineEdit from "react-edit-inline";

export default class ListItem extends React.Component {
  static propTypes = {
    list: ImmutablePropTypes.record.isRequired
  }

  onDestroyClick() {
    if (window.confirm("Are you sure?")) {
      this.props.destroyList({
        list: this.props.list
      });
    }
  }

  onNameChange(data) {
    this.props.updateList({
      list: this.props.list.set("name", data.name)
    });
  }

  render() {
    const inlineEdit = <InlineEdit
                         text={this.props.list.name}
                         paramName="name"
                         change={::this.onNameChange}
                         style={{ padding: "5px", fontSize: "inherit", width: "100%" }} />;
    return (
      <ListGroupItem style={{ display: "flex", alignItems: "center" }}>
        {inlineEdit}
        <i style={{ marginLeft: "auto", cursor: "pointer" }} className="fa fa-remove" onClick={::this.onDestroyClick} />
      </ListGroupItem>
      );
  }
}