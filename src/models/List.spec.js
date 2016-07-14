import { expect } from "chai";
let mock = require("superagent-mocker")(require("superagent"));
import { List as ImmutableList } from "immutable";

import List from "./List";

describe("Model List", () => {

  let model;
  beforeEach(() => {
    model = new List;
  });

  let columns = ["id", "name", "tasks_count"];
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
          name: "List.1",
          "tasks_count": 0
        },
        {
          id: 2,
          name: "List.2",
          "tasks_count": 1
        }
      ];
      mock.get(`${__API_URL__}/lists`, () => {
        return {
          body: fixtures
        };
      });
    });

    it("returns lists", (done) => {
      List
        .fetchAll()
        .then((lists) => {
          expect(lists).to.be.instanceOf(ImmutableList);
          expect(lists.size).to.equal(2);
          expect(lists.get(0).toJSON()).to.deep.equal(fixtures[0]);
          expect(lists.get(1).toJSON()).to.deep.equal(fixtures[1]);
        })
        .then(done).catch(done);
    });


  });
});
