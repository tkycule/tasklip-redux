import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { reduxForm, Field, formValueSelector } from "redux-form/immutable";
import { TextField, SelectField, Checkbox } from "redux-form-material-ui";
import MenuItem from "material-ui/MenuItem";
import { Button, Well, FormGroup } from "react-bootstrap";
import moment from "moment";

import * as v from "utils/validation";
import * as actions from "actions";

const formName = "taskForm";
const selector = formValueSelector(formName);

@withRouter
@connect(
  state => ({
    lists: state.lists,
    task: state.task,
    formValue: selector(state, "started_at", "ended_at"),
  }),

  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  })
)
@reduxForm({
  form: formName,
  validate: v.createValidator({
    title: [v.required],
  }),
})
export default class EditTask extends React.Component {
  static propTypes = {
    lists: ImmutablePropTypes.list,
    task: ImmutablePropTypes.record,
    actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    params: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    valid: React.PropTypes.bool.isRequired,
    initialize: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
    formValue: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.onDateTimeChange = ::this.onDateTimeChange;
    this.onSubmit = ::this.onSubmit;
    this.onBackClick = ::this.onBackClick;
    this.renderDateTime = ::this.renderDateTime;
  }

  componentDidMount() {
    this.props.actions.fetchTask(this.props.params.task_id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.task !== nextProps.task) {
      this.props.initialize(nextProps.task.toForm());
    }
  }

  componentWillUnmount() {
    this.props.actions.clearTask();
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

  onDateTimeChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    if (!value) {
      return;
    }

    // もう片方が空欄なら自動で値を入れる
    if (name === "started_at" && !this.props.formValue.ended_at) {
      this.props.change("ended_at", moment(value).add(1, "hours").format("YYYY-MM-DDTHH:mm"));
    } else if (name === "ended_at" && !this.props.formValue.started_at) {
      this.props.change("started_at", moment(value).subtract(1, "hours").format("YYYY-MM-DDTHH:mm"));
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

  renderDateTime(field) {
    return (
      <TextField
        {...field.input}
        type="datetime-local"
        className="text-center"
        onChange={(e) => {
                    field.onChange(e);
                    field.input.onChange(e);
                  }} />
      );
  }

  renderListMenuItems() {
    if (this.props.lists) {
      return this.props.lists.map((list, index) => <MenuItem value={list.id} primaryText={list.name} key={index} />);
    }
    return <MenuItem value={-1} primaryText="Loading..." />;
  }

  render() {
    let form;

    if (this.props.task) {
      form = (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="title"
            floatingLabelText="Title"
            component={TextField}
            fullWidth />
          <Field
            name="memo"
            floatingLabelText="Memo"
            component={TextField}
            multiLine
            fullWidth />
          <Field
            name="list_id"
            floatingLabelText="List"
            component={SelectField}
            fullWidth>
            {this.renderListMenuItems()}
          </Field>
          <Field
            name="done"
            label="DONE"
            component={Checkbox}
            className="m-y-2" />
          <FormGroup>
            <label>
              Alarm
            </label>
            <Field
              name="alarmed_at"
              label="Alarmed At"
              component={TextField}
              type="datetime-local" />
          </FormGroup>
          <FormGroup>
            <label>
              期間
            </label>
            <Field name="started_at" component={this.renderDateTime} onChange={this.onDateTimeChange} /> 〜
            <Field name="ended_at" component={this.renderDateTime} onChange={this.onDateTimeChange} />
          </FormGroup>
          <Button
            bsStyle="primary"
            block
            type="submit"
            disabled={!this.props.valid || this.props.submitting}>
            UPDATE
          </Button>
          <Button block onClick={this.onBackClick}>
            BACK
          </Button>
        </form>
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
