import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";

import * as actions from "actions";

import { Toolbar, ToolbarTitle, ToolbarGroup } from "material-ui/Toolbar";
import { Grid, Row, Col } from "react-flexbox-grid";
import FlatButton from "material-ui/FlatButton";

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
      rightToolbar = <ToolbarGroup lastChild={true}>
                       <ToolbarTitle text={this.props.currentUser.email} style={{ fontSize: "12px" }} />
                       <FlatButton label="Logout" onClick={::this.onClickLogout} />
                     </ToolbarGroup>;
    }
    return (
      <div>
        <Toolbar style={{ marginBottom: "20px" }}>
          <ToolbarGroup>
            <ToolbarTitle text="Tasklip Redux" />
          </ToolbarGroup>
          {rightToolbar}
        </Toolbar>
        <Notification notification={this.props.notification} clearNotification={this.props.actions.clearNotification} />
        <Grid>
          <Row>
            <Col xs={12}>
            {this.props.children}
            </Col>
          </Row>
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
