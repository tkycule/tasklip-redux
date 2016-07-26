import { Record, List as ImmutableList } from "immutable";

import request from "utils/request";

const ListRecord = Record({
  id: null,
  name: null,
  tasks_count: 0
});

export default class List extends ListRecord {

  static fetchAll() {
    return request
      .get("/lists")
      .then((res) => new ImmutableList(res.body.map((attributes) => new List(attributes))));
  }

  save() {
    if (this.id == null) {
      return request
        .post(`/lists/`, this.toJSON())
        .then((res) => new List(res.body));
    } else {
      return request
        .patch(`/lists/${this.id}`, this.toJSON())
        .then((res) => new List(res.body));
    }
  }

  destroy() {
    return request.destroy(`/lists/${this.id}`);
  }
}
