import assert from "power-assert";
import { List } from "immutable";
import Task from "./Task";

const mock = require("superagent-mocker")(require("superagent"));

describe("Model Task", () => {
  let model;
  beforeEach(() => {
    model = new Task();
  });

  const columns = ["id", "list_id", "title", "memo", "done", "alarmed_at", "started_at", "ended_at", "created_at", "updated_at"];
  columns.forEach((column) => {
    it(`should set ${column}`, () => {
      assert(model.set(column, "some value").get(column) === "some value");
    });
  });

  describe(".fetchAll", () => {
    let fixtures;

    beforeEach(() => {
      fixtures = [
        {
          id: 1,
          list_id: 1,
          title: "Task.1",
        },
        {
          id: 2,
          list_id: 1,
          name: "Task.2",
        },
      ];
      mock.get(`${__API_URL__}/lists/1/tasks`, () => ({
        body: fixtures,
      }));
    });

    it("returns tasks", (done) => {
      Task
        .fetchAll({
          listId: 1,
        })
        .then((tasks) => {
          assert(tasks instanceof List);
          assert(tasks.size === 2);
          assert.deepEqual(tasks.get(0).toJS(), new Task(fixtures[0]).toJS());
          assert.deepEqual(tasks.get(1).toJS(), new Task(fixtures[1]).toJS());
        })
        .then(done).catch(done);
    });
  });
});
