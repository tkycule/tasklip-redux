import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";

import { Nav, NavItem, Panel } from "react-bootstrap";

import * as actions from "actions";

export class Lists extends React.Component {

  static propTypes = {
    lists: ImmutablePropTypes.list
  }

  componentDidMount() {
    this.props.actions.fetchLists();
  }

  onSelectList(index) {
    if (index != -1) {
      this.props.router.push(`/lists/${index}` + (index != "_config_" ? "/tasks" : ""));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname.indexOf("config") == -1 && nextProps.params.listId == undefined && nextProps.lists.size > 0) {
      let list = nextProps.lists.find((list) => list.id == this.props.params.list) || nextProps.lists.get(0);
      this.props.router.push(`/lists/${list.id}/tasks`);
    }
  }

  render() {
    let lists;

    if (!this.props.lists.isEmpty()) {
      lists = this.props.lists.map((list) => <NavItem key={list.id} eventKey={String(list.id)}>
                                               {list.name} [
                                               {list.tasks_count}]
                                             </NavItem>);
    } else {
      lists = <NavItem eventKey={-1}>
                Loading...
              </NavItem>;
    }

    return (
      <div>
        <Nav
          bsStyle="pills"
          onSelect={::this.onSelectList}
          activeKey={this.props.params.listId || "_config_"}
          style={{ marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
          {lists}
          <NavItem eventKey="_config_">
            <i className="fa fa-list" />
          </NavItem>
        </Nav>
        {this.props.children}
      </div>
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
)(withRouter(Lists));
