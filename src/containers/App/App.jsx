import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";

import * as actions from "actions";

import { Navbar, Nav, NavItem, Grid } from "react-bootstrap";

import Notification from "components/Notification/Notification";

export default class App extends React.Component {
  static propTypes = {
    currentUser: ImmutablePropTypes.record
  }

  onClickLogout() {
    this.props.currentUser.logout();
    this.props.actions.logout();
    this.props.router.push("/");
    this.props.actions.notification({
      message: "ログアウトしました"
    });
  }

  render() {
    let rightToolbar;
    if (this.props.currentUser) {

      rightToolbar = <Nav pullRight>
                       <Navbar.Text>
                         {this.props.currentUser.email}
                       </Navbar.Text>
                       <NavItem onClick={::this.onClickLogout}>
                         Logout
                       </NavItem>
                     </Nav>;
    }
    return (
      <div>
        <Navbar fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>
              TasklipRedux
            </Navbar.Brand>
          </Navbar.Header>
          {rightToolbar}
        </Navbar>
        <Grid fluid={true}>
          <Notification notification={this.props.notification} clearNotification={this.props.actions.clearNotification} />
          {this.props.children}
        </Grid>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    notification: state.notification
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
)(withRouter(App));
