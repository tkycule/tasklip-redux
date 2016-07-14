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

}
