import { expect } from "chai";
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
      expect(model.set(column, "some value")).to.have.property(column, "some value");
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

    it("returns lists", (done) => {
      Task
        .fetchAll({
          listId: 1,
        })
        .then((lists) => {
          expect(lists).to.be.instanceOf(List);
          expect(lists.size).to.equal(2);
          expect(lists.get(0)).to.equal(new Task(fixtures[0]));
          expect(lists.get(1)).to.equal(new Task(fixtures[1]));
        })
        .then(done).catch(done);
    });
  });
});
