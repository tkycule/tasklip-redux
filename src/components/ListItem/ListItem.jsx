import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import { ListItem as UIListItem } from "material-ui/List";
import IconButton from "material-ui/IconButton";

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

  render() {
    return (
      <UIListItem primaryText={this.props.list.name} rightIconButton={<IconButton iconClassName="fa fa-times" onClick={::this.onDestroyClick} />} />
      );
  }
}
