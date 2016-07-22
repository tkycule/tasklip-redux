import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { Card, CardText, CardActions } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import Formsy from "formsy-react";
import { FormsyText, FormsySelect, FormsyCheckbox } from "formsy-material-ui/lib";

import * as actions from "actions";
import DateTimePicker from "components/DateTimePicker/DateTimePicker";


export class EditTask extends React.Component {

  static propTypes = {
  }


  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    };
  }

  componentDidMount() {
    this.props.actions.fetchTask(this.props.params.taskId);
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
    data = _.pickBy(data, (value, key) => key.indexOf("__") == -1);
    data.alarmed_at = this.refs.alarmedAt.getValue();
    data.started_at = this.refs.startedAt.getValue();
    data.ended_at = this.refs.endedAt.getValue();

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

  render() {
    let form;
    let listItems;

    if (this.props.lists) {
      listItems = this.props.lists.map((list) => <MenuItem value={list.id} primaryText={list.name} key={list.id} />);
    } else {
      listItems = <MenuItem value={-1} primaryText="Loading..." />;
    }

    if (this.props.task) {
      form = <Card>
               <CardText>
                 <FormsyText
                   name="title"
                   floatingLabelText="Title"
                   fullWidth={true}
                   defaultValue={this.props.task.title}
                   required />
                 <FormsyText
                   name="memo"
                   floatingLabelText="memo"
                   fullWidth={true}
                   defaultValue={this.props.task.memo}
                   multiLine={true}
                   rows={5} />
                 <FormsySelect name="list_id" value={this.props.task.list_id}>
                   {listItems}
                 </FormsySelect>
                 <FormsyCheckbox
                   name="done"
                   defaultChecked={this.props.task.done}
                   label="DONE"
                   style={{ marginTop: 16 }} />
                 <DateTimePicker ref="alarmedAt" label="alarmed_at" date={this.props.task.alarmed_at} />
                 <DateTimePicker ref="startedAt" label="started_at" date={this.props.task.started_at} />
                 <DateTimePicker ref="endedAt" label="ended_at" date={this.props.task.ended_at} />
               </CardText>
               <CardActions>
                 <RaisedButton label="BACK" onClick={::this.onBackClick} />
                 <RaisedButton
                   type="submit"
                   label="UPDATE"
                   primary={true}
                   disabled={!this.state.canSubmit} />
               </CardActions>
             </Card>;
    } else {
      form = <Card>
               Loading...
             </Card>;
    }

    return (
      <div>
        <Formsy.Form onValid={::this.enableButton} onInvalid={::this.disableButton} onSubmit={::this.onSubmit}>
          {form}
        </Formsy.Form>
      </div>
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
