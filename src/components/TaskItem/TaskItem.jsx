import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import { ListItem } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FontIcon from "material-ui/FontIcon";
import { blue500 } from 'material-ui/styles/colors';

export default class TaskItem extends React.Component {
  static propTypes = {
    task: ImmutablePropTypes.record.isRequired,
    updateTask: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired
  }

  onCheck(event, isInputChecked) {
    this.props.updateTask({
      task: this.props.task.set("done", isInputChecked)
    });
  }

  onEditClick() {
    this.props.router.push(`/lists/${this.props.task.list_id}/tasks/${this.props.task.id}/edit`);
  }

  onDestroyClick() {
    if (window.confirm("Are you sure?")) {
      this.props.destroyTask({
        task: this.props.task
      });
    }
  }

  render() {
    const iconButtonElement = <IconButton iconClassName="material-icons">
                                more_vert
                              </IconButton>;

    const rightIconMenu = <IconMenu iconButtonElement={iconButtonElement} anchorOrigin={{ horizontal: "right", vertical: "top" }} targetOrigin={{ horizontal: "right", vertical: "top" }}>
                            <MenuItem onClick={::this.onEditClick}> Edit
                            </MenuItem>
                            <MenuItem onClick={::this.onDestroyClick}> Delete
                            </MenuItem>
                          </IconMenu>;

    let alarmedAt = this.props.task.alarmed_at ? <FontIcon className="material-icons" style={{ fontSize: 16 }} color={blue500}>
                                                   alarm
                                                 </FontIcon> : "";
    let startedAt = this.props.task.started_at ? <FontIcon className="material-icons" style={{ fontSize: 16 }} color={blue500}>
                                                   today
                                                 </FontIcon> : "";
    let primaryText = <span>{this.props.task.title} {alarmedAt}{startedAt}</span>;

    return (
      <ListItem
        leftCheckbox={<Checkbox checked={this.props.task.done} onCheck={::this.onCheck} />}
        primaryText={primaryText}
        secondaryTextLines={2}
        rightIconButton={rightIconMenu} />
      );
  }
}
