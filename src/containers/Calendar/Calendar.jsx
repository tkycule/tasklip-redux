import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "actions";

import $ from "jquery";
import "fullcalendar";

@connect(
  state => ({
    calenderEvents: state.calenderEvents,
  }),

  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)
export default class Calendar extends React.Component {

  static propTypes = {
    actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
  }

  componentDidMount() {
    $(".full-calendar").fullCalendar({
      header: {
        left: "prev, next, today",
        center: "title",
        right: "month, agendaWeek, agendaDay",
      },
      nextDayThreshold: "00:00:00",
      displayEventTime: false,
      slotLabelFormat: "H:mm",
      columnFormat: {
        agenda: "DD [(]ddd[)]",
      },
      views: {
        month: {
          titleFormat: "YYYY年MM月",
        },
      },
      events: (start, end, timezone, callback) => {
        this.props.actions.fetchCalendarEvents({
          start: start.format(),
          end: end.format(),
          callback,
        });
      },
    });
  }

  render() {
    return <div className="full-calendar" />;
  }
}
