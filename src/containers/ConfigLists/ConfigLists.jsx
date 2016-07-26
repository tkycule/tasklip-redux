import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import { withRouter } from "react-router";

import Formsy from "formsy-react";
import { FormsyText } from "formsy-material-ui/lib";

import Paper from "material-ui/Paper";
import { List as UIList } from "material-ui/List";

import List from "models/List";
import ListItem from "components/ListItem/ListItem";
import * as actions from "actions";

export class ConfigLists extends React.Component {

  static propTypes = {
  }

  onSubmit(data, resetForm) {
    this.props.actions.addList({
      list: new List(data),
      onSuccess: resetForm
    });
  }

  render() {
    return (
      <Paper>
        <Formsy.Form onSubmit={::this.onSubmit} style={{ padding: "0px 20px 0px 20px" }}>
          <FormsyText
            ref="name"
            name="name"
            fullWidth={true}
            required
            floatingLabelText="New List"
            autocomplete="off" />
        </Formsy.Form>
        <UIList>
          <ReactCSSTransitionGroup transitionName="list" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.props.lists.map((list) => <ListItem list={list} key={list.id} destroyList={this.props.actions.destroyList} />)}
          </ReactCSSTransitionGroup>
        </UIList>
      </Paper>
      );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists
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
)(ConfigLists);
