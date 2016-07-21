import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import { ListItem } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";

export default class TaskItem extends React.Component {
  static propTypes = {
    task: ImmutablePropTypes.record.isRequired,
    updateTask: React.PropTypes.func.isRequired
  }

  onCheck(event, isInputChecked) {
    this.props.updateTask({
      task: this.props.task.set("done", isInputChecked)
    });
  }

  onDestroyClick() {
    if (window.confirm("Are you sure?")) {
      this.props.destroyTask({
        task: this.props.task
      });
    }
  }

  render() {
    return (
      <ListItem leftCheckbox={<Checkbox checked={this.props.task.done} onCheck={::this.onCheck} />} primaryText={this.props.task.title} rightIconButton={<IconButton iconClassName="material-icons" onClick={::this.onDestroyClick}>
                                                                                                                                                     clear
                                                                                                                                                   </IconButton>} />
      );
  }
}
