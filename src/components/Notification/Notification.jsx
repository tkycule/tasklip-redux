import React from "react";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";

import { Card, CardHeader } from "material-ui/Card";
import { blue100 } from "material-ui/styles/colors";

export default class Notification extends React.Component {

  static propTypes = {

  }

  constructor(props) {
    super(props);

    this.timeoutId = null;
    this.state = {
      message: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification !== this.props.notification && nextProps.notification.message != null) {
      this.setState({
        message: nextProps.notification.message
      });

      this.timeoutId = setTimeout(() => {
        this.setState({
          message: null
        });
        this.props.clearNotification();
      }, 3000);
    }
  }

  style = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: blue100,
    textAlign: "center",
    cursor: "pointer"
  }

  onClickCard() {
    clearTimeout(this.timeoutId);
    this.setState({
      message: null
    });
    this.props.clearNotification();
  }

  render() {
    let component;
    if (this.state.message != null) {
      component = <Card style={this.style} onClick={::this.onClickCard}>
                    <CardHeader title={this.props.notification.message} />
                  </Card>
      ;
    }

    return <ReactCSSTransitionGroup transitionName="notification" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
             {component}
           </ReactCSSTransitionGroup>;
  }
}
