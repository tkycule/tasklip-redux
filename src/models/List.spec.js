import { List as ImmutableList } from "immutable";
import assert from "power-assert";

import List from "./List";

const mock = require("superagent-mocker")(require("superagent"));

describe("Model List", () => {
  let model;
  beforeEach(() => {
    model = new List();
  });

  const columns = ["id", "name", "tasks_count"];
  columns.forEach((column) => {
    it(`should set ${column}`, () => {
      assert.equal(model.set(column, "some value").get(column), "some value");
    });
  });

  describe(".fetchAll", () => {
    let fixtures;

    beforeEach(() => {
      fixtures = [
        {
          id: 1,
          name: "List.1",
          tasks_count: 0,
        },
        {
          id: 2,
          name: "List.2",
          tasks_count: 1,
        },
      ];
      mock.get(`${__API_URL__}/lists`, () => ({
        body: fixtures,
      }));
    });

    it("returns lists", (done) => {
      List
        .fetchAll()
        .then((lists) => {
          assert(lists instanceof ImmutableList);
          assert(lists.size === 2);
          assert.deepEqual(lists.get(0).toJS(), fixtures[0]);
          assert.deepEqual(lists.get(1).toJS(), fixtures[1]);
        })
        .then(done).catch(done);
    });
  });
});
