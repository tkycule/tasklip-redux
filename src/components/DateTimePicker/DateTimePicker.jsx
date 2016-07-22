import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import { FormsyDate, FormsyTime } from "formsy-material-ui/lib";
import IconButton from "material-ui/IconButton";

import moment from "moment";
import areIntlLocalesSupported from "intl-locales-supported";

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(["ja"])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require("intl");
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require("intl/locale-data/jsonp/ja");
}

export default class DateTimePicker extends React.Component {
  static propTypes = {
    label: React.PropTypes.string
  }

  onClearClick() {
    this.refs.date.setValue();
    this.refs.time.setValue();
  }

  onDateChange() {
    if (!this.refs.time.getValue()) {
      this.refs.time.setValue(moment("00:00:00", "HH:mm:ss").toDate());
    }
  }

  onTimeChange() {
    if (!this.refs.date.getValue()) {
      this.refs.date.setValue(new Date());
    }
  }

  getValue() {
    let date = this.refs.date.getValue();
    if (date) {
      let time = this.refs.time.getValue();
      date.setHours(time.getHours());
      date.setMinutes(time.getMinutes());
      date.setSeconds(time.getSeconds());
      return date;
    }
  }

  render() {
    let defaultDate = this.props.date ? new Date(this.props.date) : null;
    return (
      <div>
        <label>
          {this.props.label}
        </label>
        <FormsyDate
          ref="date"
          name="__date"
          defaultDate={defaultDate}
          DateTimeFormat={DateTimeFormat}
          locale="ja"
          style={{ display: "inline-block", marginRight: 10 }}
          textFieldStyle={{ width: 100 }}
          inputStyle={{ textAlign: "center" }}
          onChange={::this.onDateChange} />
        <FormsyTime
          ref="time"
          name="__time"
          defaultTime={defaultDate}
          DateTimeFormat={DateTimeFormat}
          locale="ja"
          format="24hr"
          style={{ display: "inline-block" }}
          textFieldStyle={{ width: 100 }}
          inputStyle={{ textAlign: "center" }}
          onChange={::this.onTimeChange} />
        <IconButton iconClassName="material-icons" onClick={::this.onClearClick}>
          clear
        </IconButton>
      </div>
      );
  }
}
