import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "actions";

import { Tabs, Tab } from "react-bootstrap";

import Login from "components/Login";
import Register from "components/Register";

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export class Home extends React.Component {
  static propTypes = {
    login: React.PropTypes.func.isRequired,
    register: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <Tabs defaultActiveKey={1} id="home-tabs">
        <Tab title="Login" eventKey={1}>
          <Login login={this.props.login} />
        </Tab>
        <Tab title="Register" eventKey={2}>
          <Register register={this.props.register} />
        </Tab>
      </Tabs>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
