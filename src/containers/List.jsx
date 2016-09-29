import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";

import { reduxForm, Field } from "redux-form";
import { TextField } from "redux-form-material-ui";
import { Button, ListGroup } from "react-bootstrap";

import * as actions from "actions";
import { TaskItem } from "components";
import { Task } from "models";

@withRouter
@connect(
  state => ({
    tasks: state.tasks,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  })
)
@reduxForm({
  form: "newTaskForm",
})
export default class List extends React.Component {
  static propTypes = {
    tasks: ImmutablePropTypes.list,
    actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    params: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showDone: false,
    };
    this.onSubmit = ::this.onSubmit;
    this.onDoneClick = ::this.onDoneClick;
  }

  componentDidMount() {
    this.props.actions.fetchTasks({
      listId: this.props.params.listId,
      showDone: this.state.showDone,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.listId !== nextProps.params.listId) {
      this.setState({
        showDone: false,
      });
      this.props.actions.fetchTasks({
        listId: nextProps.params.listId,
      });
    }
  }

  onSubmit(data) {
    if (data.title === "") {
      return null;
    }

    return new Promise((resolve, reject) => {
      data.list_id = this.props.params.listId;
      this.props.actions.addTask({
        task: new Task(data),
        onSuccess: this.props.reset,
        resolve,
        reject,
      });
    });
  }

  onDoneClick() {
    this.props.actions.fetchTasks({
      listId: this.props.params.listId,
      showDone: !this.state.showDone,
    });
    this.setState({
      showDone: !this.state.showDone,
    });
  }

  render() {
    return (
      <div>
        <form style={{ marginBottom: "10px" }} onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="title"
            floatingLabelText="New Task"
            component={TextField}
            autoComplete="off"
            fullWidth />
          <Button type="submit" disabled={this.props.submitting}>
            <i className="fa fa-plus" />
          </Button>
        </form>
        <ListGroup>
          {this.props.tasks.map(task => <TaskItem
                                          task={task}
                                          updateTask={this.props.actions.updateTask}
                                          destroyTask={this.props.actions.destroyTask}
                                          router={this.props.router}
                                          key={task.id} />)}
        </ListGroup>
        <Button block onClick={this.onDoneClick}>
          {this.state.showDone ? "完了済みは表示しない" : "完了済みも表示する"}
        </Button>
      </div>
      );
  }
}
