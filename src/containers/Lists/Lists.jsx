import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";

import { Nav, NavItem } from "react-bootstrap";

import * as actions from "actions";

@withRouter
@connect(
  state => ({
    lists: state.lists,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  })
)
export default class Lists extends React.Component {
  static propTypes = {
    actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    lists: ImmutablePropTypes.list,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    location: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.onSelectList = ::this.onSelectList;
  }

  componentDidMount() {
    this.props.actions.fetchLists();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname.endsWith("/lists")) {
      const list = nextProps.lists.find(l => l.id === this.props.params.list) || nextProps.lists.get(0);
      this.props.router.push(`/lists/${list.id}/tasks`);
    }
  }

  onSelectList(eventKey) {
    this.props.router.push(eventKey);
  }

  render() {
    let lists;

    if (!this.props.lists.isEmpty()) {
      lists = this.props.lists.map(list => <NavItem key={list.id} eventKey={`/lists/${list.id}/tasks`} href={`/lists/${list.id}/tasks`}>
                                             {list.name} [
                                             {list.tasks_count}]
                                           </NavItem>);
    } else {
      lists = (
        <NavItem eventKey={-1}>
          Loading...
        </NavItem>
      );
    }

    return (
      <div>
        <Nav
          bsStyle="pills"
          onSelect={this.onSelectList}
          activeHref={this.props.location.pathname}
          style={{ marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
          {lists}
          <NavItem eventKey="/lists/config" href="/lists/config">
            <i className="fa fa-list" />
          </NavItem>
          <NavItem eventKey="/lists/calendar" href="/lists/calendar">
            <i className="fa fa-calendar" />
          </NavItem>
        </Nav>
        {this.props.children}
      </div>
      );
  }
}
