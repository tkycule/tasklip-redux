import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import { withRouter } from "react-router";

import Formsy from "formsy-react";
import { FormsyText } from "formsy-material-ui/lib";

import Paper from "material-ui/Paper";
import { List as UIList } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";

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
    // TODO: バグ修正待ち https://github.com/mbrookes/formsy-material-ui/pull/106
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
    // TODO: autocompleteが設定できない https://github.com/callemall/material-ui/issues/4639
    return (
      <Paper>
        <Formsy.Form onSubmit={::this.onSubmit} style={{ padding: "0px 20px 0px 20px" }}>
          <FormsyText
            ref="title"
            name="title"
            fullWidth={true}
            required
            floatingLabelText="New Task"
            autocomplete="off" />
        </Formsy.Form>
        <UIList>
          <ReactCSSTransitionGroup transitionName="list" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.props.tasks.map((task) => <TaskItem
                                              task={task}
                                              updateTask={this.props.actions.updateTask}
                                              destroyTask={this.props.actions.destroyTask}
                                              router={this.props.router}
                                              key={task.id} />)}
          </ReactCSSTransitionGroup>
        </UIList>
        <div style={{ padding: "20px 10px" }}>
          <RaisedButton fullWidth={true} onClick={this.onDoneClick.bind(this)} label={this.state.showDone ? "完了済みは表示しない" : "完了済みも表示する"} />
        </div>
      </Paper>
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
