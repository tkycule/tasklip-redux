import { createAction } from "redux-actions";
import changeCase from "change-case";

createSuite("login", true);
createSuite("logout", true);
createSuite("register");
createSuite("notification", true);
createSuite("clear_notification", true);
createSuite("fetchLists");
createSuite("fetchTasks");
createSuite("addTask");
createSuite("updateTask");
createSuite("destroyTask");

function createSuite(action, noSuccessAndFailure = false) {
  let constant = changeCase.constantCase(action);
  exports[constant] = constant;
  exports[action] = createAction(constant);

  if (!noSuccessAndFailure) {
    exports[constant + "_SUCCESS"] = constant + "_SUCCESS";
    exports[constant + "_FAILURE"] = constant + "_FAILURE";
    exports[action + "Success"] = createAction(constant + "_SUCCESS");
    exports[action + "Failure"] = createAction(constant + "_FAILURE");
  }
}
