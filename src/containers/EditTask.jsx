import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { Button, Well, FormGroup, ControlLabel, InputGroup } from "react-bootstrap";
import Form from "formsy-react-components/release/form";
import { Input, Checkbox, Textarea, Select } from "formsy-react-components";
import moment from "moment";

import * as actions from "actions";

@withRouter
@connect(
  state => ({
    lists: state.lists,
    task: state.task,
  }),

  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  })
)
export default class EditTask extends React.Component {

  static propTypes = {
    lists: ImmutablePropTypes.list,
    task: ImmutablePropTypes.record,
    actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    params: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      alarmedAt: null,
    };

    this.onDateTimeChange = ::this.onDateTimeChange;
    this.enableButton = ::this.enableButton;
    this.disableButton = ::this.disableButton;
    this.onSubmit = ::this.onSubmit;
    this.onBackClick = ::this.onBackClick;
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
        endedAt: (nextProps.task.ended_at ? new Date(nextProps.task.ended_at) : null),
      });
    }
  }

  onSubmit(data) {
    const task = this.props.task.merge(data);
    this.props.actions.updateTask({
      task,
      notification: true,
      onSuccess: this.onUpdateSuccess.bind(this, task),
    });
  }

  onUpdateSuccess(task) {
    this.props.router.push(`/lists/${task.list_id}/tasks`);
  }

  onBackClick() {
    this.props.router.push(`/lists/${this.props.task.list_id}/tasks`);
  }

  onDateTimeChange(name, value) {
    if (!value) {
      return;
    }

    // もう片方が空欄なら同じ値を入れる
    if (name === "started_at" && !this.ended_at.element.value) {
      this.ended_at.changeValue({
        currentTarget: {
          value: moment(value).add(1, "hours").format("YYYY-MM-DDTHH:mm"),
        },
      });
    } else if (name === "ended_at" && !this.started_at.element.value) {
      this.started_at.changeValue({
        currentTarget: {
          value: moment(value).subtract(1, "hours").format("YYYY-MM-DDTHH:mm"),
        },
      });
    }
  }

  enableButton() {
    // 期間が正しいかチェック
    const startedAt = this.started_at.element.value;
    const endedAt = this.ended_at.element.value;
    this.setState({
      canSubmit: (!!startedAt && !!endedAt && (moment(startedAt).unix() < moment(endedAt).unix())) || (!startedAt && !endedAt),
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  renderDateTime(attrs) {
    return (
      <Input
        name={attrs.name}
        ref={(c) => {
               this[attrs.name] = c;
             }}
        label={attrs.label}
        type="datetime-local"
        value={attrs.value ? moment(attrs.value).format("YYYY-MM-DDTHH:mm") : ""}
        layout={attrs.layout}
        onChange={this.onDateTimeChange} />
      );
  }

  render() {
    let form;
    let listItems;

    if (this.props.lists) {
      listItems = this.props.lists.map(list => ({
        value: list.id,
        label: list.name,
      }));
    } else {
      listItems = {
        value: -1,
        label: "Loading...",
      };
    }

    if (this.props.task) {
      form = (
        <Form
          layout="vertical"
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onSubmit={this.onSubmit}>
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
          {this.renderDateTime({
             name: "alarmed_at",
             label: "Alarm",
             value: this.props.task.alarmed_at,
           })}
          <FormGroup>
            <ControlLabel>
              期間
            </ControlLabel>
            <InputGroup>
              {this.renderDateTime({
                 name: "started_at",
                 value: this.props.task.started_at,
                 layout: "elementOnly",
               })}
              <InputGroup.Addon>
                〜
              </InputGroup.Addon>
              {this.renderDateTime({
                 name: "ended_at",
                 value: this.props.task.ended_at,
                 layout: "elementOnly",
               })}
            </InputGroup>
          </FormGroup>
          <Button
            bsStyle="primary"
            block
            type="submit"
            disabled={!this.state.canSubmit}>
            UPDATE
          </Button>
          <Button block onClick={this.onBackClick}>
            BACK
          </Button>
        </Form>
      );
    } else {
      form = (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <Well>
        {form}
      </Well>
      );
  }
}
