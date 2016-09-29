import React from "react";

import { ToastContainer, ToastMessage } from "react-toastr";

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export default class Notification extends React.Component {
  static propTypes = {
    notification: React.PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification !== this.props.notification && nextProps.notification.title != null) {
      const notification = nextProps.notification;

      this.container[notification.type || "success"](
        notification.message,
        notification.title,
        {
          timeOut: notification.timeOut || 5000,
          closeButton: true,
          showAnimation: "animated fadeIn",
          hideAnimation: "animated fadeOut",
        },
      );
    }
  }


  render() {
    return (
      <ToastContainer
        ref={(c) => {
               this.container = c;
             }}
        toastMessageFactory={ToastMessageFactory}
        preventDuplicates={false}
        className="toast-top-full-width" />
      );
  }
}
