import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "actions";

import { Tabs, Tab } from "material-ui/Tabs";

import Login from "components/Login/Login";

export class Home extends React.Component {

  static propTypes = {
  }

  render() {
    return (
      <Tabs>
        <Tab label="Login">
          <Login login={this.props.login} />
        </Tab>
        <Tab label="Register">
          Register
        </Tab>
      </Tabs>
      );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
