import React from "react";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";

import { Card, CardHeader } from "material-ui/Card";
import { green100, yellow100, red100 } from "material-ui/styles/colors";

export default class Notification extends React.Component {

  static propTypes = {

  }

  static backgroundColors = {
    "success": green100,
    "warning": yellow100,
    "error": red100
  }

  constructor(props) {
    super(props);

    this.timeoutId = null;
    this.state = {
      message: null,
      type: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification !== this.props.notification && nextProps.notification.message != null) {
      this.setState({
        message: nextProps.notification.message,
        type: nextProps.notification.type || "success"
      });

      this.timeoutId = setTimeout(() => {
        this.setState({
          message: null
        });
        this.props.clearNotification();
      }, 3000);
    }
  }


  getStyle() {
    return {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: this.constructor.backgroundColors[this.state.type],
      textAlign: "center",
      cursor: "pointer"
    };
  }

  onClickCard() {
    clearTimeout(this.timeoutId);
    this.setState({
      message: null,
      type: null
    });
    this.props.clearNotification();
  }

  render() {
    let component;
    if (this.state.message != null) {
      component = <Card style={this.getStyle.apply(this)} onClick={::this.onClickCard} className={this.state.type}>
                    <CardHeader title={this.props.notification.message} />
                  </Card>
      ;
    }

    return <ReactCSSTransitionGroup transitionName="notification" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
             {component}
           </ReactCSSTransitionGroup>;
  }
}
