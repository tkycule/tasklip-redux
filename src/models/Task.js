import { Record, List } from "immutable";

import request from "utils/request";
import moment from "moment";

const TaskRecord = new Record({
  id: null,
  list_id: null,
  title: null,
  memo: null,
  done: false,
  alarmed_at: null,
  started_at: null,
  ended_at: null,
  created_at: null,
  updated_at: null,
});

const dateFormat = "YY/MM/DD(ddd) HH:mm";

export default class Task extends TaskRecord {

  static fetch(id) {
    return request
      .get(`/tasks/${id}`)
      .then(res => new Task(res.body));
  }

  static fetchAll(options) {
    const listId = options.listId;
    return request
      .get(listId ? `/lists/${listId}/tasks` : "/tasks", _.omit(options, "listId"))
      .then(res => new List(res.body.map(attributes => new Task(attributes))));
  }

  save() {
    if (this.id == null) {
      return request
        .post(`/lists/${this.list_id}/tasks`, this.toJSON())
        .then(res => new Task(res.body));
    }
    return request
      .patch(`/tasks/${this.id}`, this.toJSON())
      .then(res => new Task(res.body));
  }

  destroy() {
    return request.destroy(`/tasks/${this.id}`);
  }

  get formattedAlarmedAt() {
    return this.alarmed_at ? moment(this.alarmed_at).format(dateFormat) : "";
  }

  get formattedStartedAt() {
    return this.started_at ? moment(this.started_at).format(dateFormat) : "";
  }

  get formattedEndedAt() {
    return this.ended_at ? moment(this.ended_at).format(dateFormat) : "";
  }

  get start() {
    if (this.started_at) {
      return this.started_at;
    } else if (this.alarmed_at) {
      return this.alarmed_at;
    }
    return null;
  }

  get end() {
    if (this.started_at) {
      return this.ended_at;
    } else if (this.alarmed_at) {
      return moment(this.alarmed_at).add(1, "hour").format();
    }
    return null;
  }

  toCalendarEvent() {
    const event = this.toJSON();
    event.start = this.start;
    event.end = this.end;
    return event;
  }

}
