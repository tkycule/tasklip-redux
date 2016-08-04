import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { Button, Well, FormGroup, ControlLabel, InputGroup } from "react-bootstrap";
import Form from "formsy-react-components/release/form";
import { Input, Checkbox, Textarea, Select } from "formsy-react-components";
import DateTime from "react-datetime";

import * as actions from "actions";

export class EditTask extends React.Component {

  static propTypes = {
    lists: ImmutablePropTypes.list,
    task: ImmutablePropTypes.record,
    actions: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      alarmedAt: null
    };
  }

  componentDidMount() {
    this.props.actions.fetchTask(this.props.params.taskId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.task) {
      this.setState({
        title: nextProps.task.title,
        alarmedAt: (nextProps.task.alarmed_at ? new Date(nextProps.task.alarmed_at) : null),
        startedAt: (nextProps.task.started_at ? new Date(nextProps.task.started_at) : null),
        endedAt: (nextProps.task.ended_at ? new Date(nextProps.task.ended_at) : null)
      });
    }
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  onSubmit(data) {
    data.alarmed_at = this.state.alarmedAt;
    data.started_at = this.state.startedAt;
    data.ended_at = this.state.endedAt;

    let task = this.props.task.merge(data);
    this.props.actions.updateTask({
      task: task,
      notification: true,
      onSuccess: this.onUpdateSuccess.bind(this, task)
    });
  }

  onUpdateSuccess(task) {
    this.props.router.push(`/lists/${task.list_id}/tasks`);
  }

  onBackClick() {
    this.props.router.push(`/lists/${this.props.task.list_id}/tasks`);
  }

  onDateTimeChange(moment, attr) {
    this.setState({
      [attr]: moment.toDate()
    });
  }

  onClickClearDateTime(attr) {
    this.setState({
      [attr]: null
    });
  }

  render() {
    let form;
    let listItems;

    if (this.props.lists) {
      listItems = this.props.lists.map((list) => {
        return {
          value: list.id,
          label: list.name
        };
      });
    } else {
      listItems = {
        value: -1,
        label: "Loading..."
      };
    }

    if (this.props.task) {
      form = <Form
               layout="vertical"
               onValid={::this.enableButton}
               onInvalid={::this.disableButton}
               onSubmit={::this.onSubmit}>
               <Input
                 name="title"
                 label="Title"
                 type="text"
                 value={this.props.task.title}
                 required />
               <Textarea
                 name="memo"
                 label="memo"
                 value={this.props.task.memo || ""}
                 rows={5} />
               <Select
                 label="List"
                 name="list_id"
                 value={this.props.task.list_id}
                 options={listItems} />
               <Checkbox
                 layout="elementOnly"
                 name="done"
                 checked={this.props.task.done || false}
                 label="DONE" />
               <FormGroup>
                 <ControlLabel>
                   Alarm
                 </ControlLabel>
                 <InputGroup>
                   <DateTime value={this.state.alarmedAt} onChange={(moment) => this.onDateTimeChange(moment, "alarmedAt")} />
                   <InputGroup.Button>
                     <Button onClick={this.onClickClearDateTime.bind(this, "alarmedAt")}>
                       <i className="fa fa-minus-circle"></i>
                     </Button>
                   </InputGroup.Button>
                 </InputGroup>
               </FormGroup>
               <FormGroup>
                 <ControlLabel>
                   期間
                 </ControlLabel>
                 <InputGroup>
                   <DateTime value={this.state.startedAt} onChange={(moment) => this.onDateTimeChange(moment, "startedAt")} />
                   <InputGroup.Button>
                     <Button onClick={this.onClickClearDateTime.bind(this, "startedAt")}>
                       <i className="fa fa-minus-circle"></i>
                     </Button>
                   </InputGroup.Button>
                   <InputGroup.Addon>
                     〜
                   </InputGroup.Addon>
                   <DateTime value={this.state.endedAt} onChange={(moment) => this.onDateTimeChange(moment, "endedAt")} />
                   <InputGroup.Button>
                     <Button onClick={this.onClickClearDateTime.bind(this, "endedAt")}>
                       <i className="fa fa-minus-circle"></i>
                     </Button>
                   </InputGroup.Button>
                 </InputGroup>
               </FormGroup>
               <Button
                 bsStyle="primary"
                 block
                 type="submit"
                 disabled={!this.state.canSubmit}>
                 UPDATE
               </Button>
               <Button block onClick={::this.onBackClick}>
                 BACK
               </Button>
             </Form> ;
    } else {
      form = <div>
               Loading...
             </div>;
    }

    return (
      <Well>
        {form}
      </Well>
      );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists,
    task: state.task
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditTask));
