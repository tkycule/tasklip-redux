import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "actions";

import $ from "jquery";
import "fullcalendar";

export class Calendar extends React.Component {

  static propTypes = {
  }

  componentDidMount() {
    $(".full-calendar").fullCalendar({
      header: {
        left: "prev, next, today",
        center: "title",
        right: "month, agendaWeek, agendaDay"
      },
      nextDayThreshold: "00:00:00",
      displayEventTime: false,
      slotLabelFormat: "H:mm",
      columnFormat: {
        agenda: "DD [(]ddd[)]"
      },
      views: {
        month: {
          titleFormat: "YYYY年MM月"
        }
      },
      events: (start, end, timezone, callback) => {
        this.props.actions.fetchCalendarEvents({
          start: start.format(),
          end: end.format(),
          callback: callback
        });
      }
    });
  }

  render() {
    return <div className="full-calendar" />;
  }
}

function mapStateToProps(state) {
  return {
    calenderEvents: state.calenderEvents
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
)(Calendar);
