import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import { withRouter } from "react-router";

import { Button, Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import { Input } from "formsy-react-components";
import Form from "formsy-react-components/release/form";

import * as actions from "actions";

import TaskItem from "components/TaskItem/TaskItem";
import Task from "models/Task";

export class List extends React.Component {
  static propTypes = {
    tasks: ImmutablePropTypes.list
  }

  constructor(props) {
    super(props);

    this.state = {
      showDone: false
    };
  }

  componentDidMount() {
    this.props.actions.fetchTasks({
      listId: this.props.params.listId,
      showDone: this.state.showDone
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.listId != nextProps.params.listId) {
      this.setState({
        showDone: false
      });
      this.props.actions.fetchTasks({
        listId: nextProps.params.listId
      });
    }
  }

  onSubmit(data, resetForm) {
    data.list_id = this.props.params.listId;
    this.props.actions.addTask({
      task: new Task(data),
      onSuccess: resetForm
    });
    resetForm();
  }

  onDoneClick() {
    this.props.actions.fetchTasks({
      listId: this.props.params.listId,
      showDone: !this.state.showDone
    });
    this.setState({
      showDone: !this.state.showDone
    });
  }

  render() {
    return (
      <div>
        <Form layout="elementOnly" onSubmit={::this.onSubmit} style={{ marginBottom: "10px" }}>
          <Input
            name="title"
            type="text"
            value=""
            fullWidth={true}
            required
            placeholder="New Task"
            autoComplete="off"
            buttonAfter={<Button type="submit">
                           <i className="fa fa-plus" />
                         </Button>} />
        </Form>
        <ListGroup>
          <ReactCSSTransitionGroup transitionName="list" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.props.tasks.map((task) => <TaskItem
                                              task={task}
                                              updateTask={this.props.actions.updateTask}
                                              destroyTask={this.props.actions.destroyTask}
                                              router={this.props.router}
                                              key={task.id} />)}
          </ReactCSSTransitionGroup>
        </ListGroup>
        <Button block onClick={this.onDoneClick.bind(this)}>
          {this.state.showDone ? "完了済みは表示しない" : "完了済みも表示する"}
        </Button>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
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
)(withRouter(List));
