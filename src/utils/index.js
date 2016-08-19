import { fromJS } from "immutable";
import _ from "lodash";

const ERROR_MESSAGES = fromJS({
  isDefaultRequiredValue: "入力してください",
  isEmail: "形式が不正です",
  minLength: "{minLength}文字以上で入力してください",
  maxLength: "{maxLength}文字以下で入力してください"
});

export function errorMessages(conditions = {}) {
  return ERROR_MESSAGES.map((message) => {
    _.forEach(conditions, (value, key) => {
      message = message.replace(new RegExp(`{${key}}`), value);
    });
    return message;
  }).toJS();
}
