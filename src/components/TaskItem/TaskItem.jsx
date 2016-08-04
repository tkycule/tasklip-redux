import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import { ListGroupItem } from "react-bootstrap";
import { Link } from "react-router";

export default class TaskItem extends React.Component {
  static propTypes = {
    task: ImmutablePropTypes.record.isRequired,
    updateTask: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired
  }

  onCheck(event) {
    this.props.updateTask({
      task: this.props.task.set("done", event.target.checked)
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
    let alarmedAt;
    let startedAt;
    if (this.props.task.alarmed_at) {
      alarmedAt = <div>
                    <i className="fa fa-bell" style={{ marginRight: "5px" }} />
                    {this.props.task.formattedAlarmedAt}
                  </div>;
    }

    if (this.props.task.started_at) {
      startedAt = <div>
                    <i className="fa fa-calendar" style={{ marginRight: "5px" }} />
                    {this.props.task.formattedStartedAt}&#xFF5E;
                    {this.props.task.formattedEndedAt}
                  </div>;
    }
    return (
      <ListGroupItem style={{ display: "flex", alignItems: "center" }}>
        <input type="checkbox" checked={this.props.task.done} onChange={::this.onCheck} />
        <Link to={`/lists/${this.props.task.list_id}/tasks/${this.props.task.id}/edit`} style={{ marginLeft: "10px" }}>
        <div>
          {this.props.task.title}
        </div>
        {alarmedAt}
        {startedAt}
        </Link>
        <i style={{ marginLeft: "auto", cursor: "pointer" }} className="fa fa-remove" onClick={::this.onDestroyClick} />
      </ListGroupItem>
      );
  }
}
