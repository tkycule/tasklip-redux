import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "actions";

import { Tabs, Tab } from "react-bootstrap";

import { Login, Register } from "components";

@connect(
  () => ({
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  })
)
export default class Home extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <Tabs id="home-tabs">
        <Tab title="Login" eventKey={1}>
          <Login login={this.props.actions.login} />
        </Tab>
        <Tab title="Register" eventKey={2}>
          <Register register={this.props.actions.register} />
        </Tab>
      </Tabs>
      );
  }
}
