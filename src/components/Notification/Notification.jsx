import React from "react";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";

import { Alert } from "react-bootstrap";

export default class Notification extends React.Component {

  static propTypes = {
    notification: React.PropTypes.object.isRequired,
    clearNotification: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.timeoutId = null;
    this.state = {
      message: null,
      type: null,
    };
    this.onClickCard = ::this.onClickCard;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification !== this.props.notification && nextProps.notification.message != null) {
      this.setState({
        message: nextProps.notification.message,
        type: nextProps.notification.type || "success",
      });

      this.timeoutId = setTimeout(() => {
        this.setState({
          message: null,
        });
        this.props.clearNotification();
      }, 3000);
    }
  }

  onClickCard() {
    clearTimeout(this.timeoutId);
    this.setState({
      message: null,
      type: null,
    });
    this.props.clearNotification();
  }

  getStyle() {
    return {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      textAlign: "center",
      cursor: "pointer",
    };
  }

  render() {
    let component;
    if (this.state.message != null) {
      component = (
        <Alert
          bsStyle={this.props.notification.type}
          style={this.getStyle()}
          onClick={this.onClickCard}
          className={this.state.type}>
          {this.props.notification.message}
        </Alert>)
      ;
    }

    return (
      <ReactCSSTransitionGroup transitionName="notification" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        {component}
      </ReactCSSTransitionGroup>
      );
  }
}
