import { Record, List } from "immutable";

import request from "utils/request";
import moment from "moment";

const TaskRecord = Record({
  id: null,
  list_id: null,
  title: null,
  memo: null,
  done: false,
  alarmed_at: null,
  started_at: null,
  ended_at: null,
  created_at: null,
  updated_at: null
});

export default class Task extends TaskRecord {

  static fetch(id) {
    return request
      .get(`/tasks/${id}`)
      .then((res) => new Task(res.body));
  }

  static fetchAll(options) {
    let params = {
      show_done: options.showDone || false
    };
    return request
      .get(`/lists/${options.listId}/tasks`, params)
      .then((res) => new List(res.body.map((attributes) => new Task(attributes))));
  }

  save() {
    if (this.id == null) {
      return request
        .post(`/lists/${this.list_id}/tasks`, this.toJSON())
        .then((res) => new Task(res.body));
    } else {
      return request
        .patch(`/tasks/${this.id}`, this.toJSON())
        .then((res) => new Task(res.body));
    }
  }

  destroy() {
    return request.destroy(`/tasks/${this.id}`);
  }

  get formattedAlarmedAt() {
    return this.alarmed_at ? moment(this.alarmed_at).format("LLLL") : "";
  }

  get formattedStartedAt() {
    return this.started_at ? moment(this.started_at).format("LLLL") : "";
  }

  get formattedEndedAt() {
    return this.ended_at ? moment(this.ended_at).format("LLLL") : "";
  }

}
