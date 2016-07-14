import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

export default class List extends React.Component {
  static propTypes = {
    list: ImmutablePropTypes.record.isRequired
  }

  render() {
    return (
      <div>
        {this.props.params.listId}
      </div>
      );
  }
}
