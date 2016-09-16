import { fromJS } from "immutable";
import _ from "lodash";

const ERROR_MESSAGES = fromJS({
  isDefaultRequiredValue: "入力してください",
  isEmail: "形式が不正です",
  minLength: "{minLength}文字以上で入力してください",
  maxLength: "{maxLength}文字以下で入力してください",
  equalsField: "{equalsField}と入力が一致しません",
});

export function errorMessages(conditions = {}) { /* eslint import/prefer-default-export:0 */
  return ERROR_MESSAGES.map((message) => {
    let mes = message;
    _.forEach(conditions, (value, key) => {
      mes = mes.replace(new RegExp(`{${key}}`), value);
    });
    return mes;
  }).toJS();
}
