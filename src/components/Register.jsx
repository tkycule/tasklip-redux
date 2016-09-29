import React from "react";

import { reduxForm, Field } from "redux-form/immutable";
import { TextField } from "redux-form-material-ui";
import { Button, Panel } from "react-bootstrap";

import * as v from "utils/validation";

@reduxForm({
  form: "registerForm",
  validate: v.createValidator({
    email: [v.required],
    password: [v.required],
    password_confirmation: [v.match("password")],
  }),
})
export default class Register extends React.Component {
  static propTypes = {
    register: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    invalid: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
  }

  onSubmit(data) {
    return new Promise((resolve, reject) => {
      this.props.register({
        email: data.get("email"),
        password: data.get("password"),
        resolve,
        reject,
      });
    });
  }

  render() {
    return (
      <Panel>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="email"
            floatingLabelText="Email"
            component={TextField}
            fullWidth />
          <Field
            name="password"
            type="password"
            floatingLabelText="Password"
            component={TextField}
            fullWidth />
          <Field
            name="password_confirmation"
            type="password"
            floatingLabelText="Password Confirmation"
            component={TextField}
            fullWidth />
          <Button
            type="submit"
            block
            bsStyle="primary"
            disabled={this.props.invalid || this.props.submitting}>
            Register
          </Button>
        </form>
      </Panel>
      );
  }
}
