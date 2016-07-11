import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "actions";

export default class App extends React.Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        App
      </div>
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
)(App);
