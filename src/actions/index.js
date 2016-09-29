import { createAction } from "redux-actions";
import changeCase from "change-case";

function createSuite(action, options = {
    noAsync: false,
  }) {
  const constant = changeCase.constantCase(action);
  exports[constant] = constant;
  exports[action] = createAction(constant);

  if (!options.noAsync) {
    exports[`${constant}_SUCCESS`] = `${constant}_SUCCESS`;
    exports[`${constant}_FAILURE`] = `${constant}_FAILURE`;
    exports[`${action}Success`] = createAction(`${constant}_SUCCESS`);
    exports[`${action}Failure`] = createAction(`${constant}_FAILURE`);
  }
}

createSuite("login");
createSuite("logout", {
  noAsync: true,
});
createSuite("register");
createSuite("notification", {
  noAsync: true,
});
createSuite("fetchLists");
createSuite("fetchTask");
createSuite("clearTask", {
  noAsync: true,
});
createSuite("fetchTasks");
createSuite("fetchCalendarEvents");
createSuite("addTask");
createSuite("updateTask");
createSuite("destroyTask");
createSuite("addList");
createSuite("updateList");
createSuite("destroyList");
