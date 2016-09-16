import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";

import * as actions from "actions";

import { Navbar, Nav, NavItem, Grid } from "react-bootstrap";

import Notification from "components/Notification/Notification";

@withRouter
@connect(
  state => ({
    currentUser: state.currentUser,
    notification: state.notification,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  })
)
export default class App extends React.Component {
  static propTypes = {
    actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    currentUser: ImmutablePropTypes.record,
    router: React.PropTypes.object.isRequired,
    notification: React.PropTypes.object.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  }

  constructor(props) {
    super(props);
    this.onClickLogout = ::this.onClickLogout;
  }

  onClickLogout() {
    this.props.currentUser.logout();
    this.props.actions.logout();
    this.props.router.push("/");
    this.props.actions.notification({
      message: "ログアウトしました",
    });
  }

  render() {
    let rightToolbar;
    if (this.props.currentUser) {
      rightToolbar = (
        <Nav pullRight>
          <Navbar.Text style={{ paddingLeft: "15px" }}>
            {this.props.currentUser.email}
          </Navbar.Text>
          <NavItem onClick={this.onClickLogout}>
            Logout
          </NavItem>
        </Nav>
      );
    }

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              TasklipRedux
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {rightToolbar}
          </Navbar.Collapse>
        </Navbar>
        <Grid fluid>
          <Notification notification={this.props.notification} clearNotification={this.props.actions.clearNotification} />
          {this.props.children}
        </Grid>
      </div>
      );
  }
}
