import { Record, Map, List } from "immutable";
import validator from "validator";

const SessionRecord = Record({
  email: null,
  password: null,
  password_confirmation: null,
  token: null
});

export default class Session extends SessionRecord {

  validate() {
    let errors = Map();

    if (validator.isNull(this.email || "")) {
      errors = errors.set("email", errors.get("email", List()).push("email is not blank"));
    } else if (!validator.isEmail(this.email)) {
      errors = errors.set("email", errors.get("email", List()).push("email is invalid"));
    }

    if (validator.isNull(this.password || "")) {
      errors = errors.set("password", errors.get("password", List()).push("password is not blank"));
    } else if (!validator.isLength(this.password, {
        min: 8,
        max: 64
      })) {
      errors = errors.set("password", errors.get("password", List()).push("password must be between 8 and 64"));
    } else if (this.password != this.password_confirmation) {
      errors = errors.set("password_confirmation", errors.get("password_confirmation", List()).push("password_confirmation doesn't match password"));
    }

    return errors.size == 0 ? null : errors;
  }
}
