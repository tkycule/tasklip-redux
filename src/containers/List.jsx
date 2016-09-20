import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";

import { Button, ListGroup } from "react-bootstrap";
import { Input } from "formsy-react-components";
import Form from "formsy-react-components/release/form";

import * as actions from "actions";

import TaskItem from "components/TaskItem";
import Task from "models/Task";

@withRouter
@connect(
  state => ({
    tasks: state.tasks,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  })
)
export default class List extends React.Component {
  static propTypes = {
    tasks: ImmutablePropTypes.list,
    actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    params: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
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

  onSubmit(data, resetForm) {
    this.props.actions.addTask({
      task: new Task(data.merge({
        list_id: this.props.params.listId,
      })),
      onSuccess: resetForm,
    });
    resetForm();
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
        <Form layout="elementOnly" onSubmit={this.onSubmit} style={{ marginBottom: "10px" }}>
          <Input
            name="title"
            type="text"
            value=""
            required
            placeholder="New Task"
            autoComplete="off"
            buttonAfter={<Button type="submit">
                           <i className="fa fa-plus" />
                         </Button>} />
        </Form>
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
