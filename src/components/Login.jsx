import React from "react";

import { reduxForm, Field } from "redux-form";
import { TextField } from "redux-form-material-ui";
import { Button, Panel } from "react-bootstrap";

import * as v from "utils/validation";

@reduxForm({
  form: "loginForm",
  validate: v.createValidator({
    email: [v.required],
    password: [v.required],
  }),
})
export default class Login extends React.Component {
  static propTypes = {
    login: React.PropTypes.func.isRequired,
    invalid: React.PropTypes.bool.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
  }

  onSubmit(data) {
    return new Promise((resolve, reject) => {
      this.props.login({
        email: data.email,
        password: data.password,
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
            floatingLabelText="Password"
            component={TextField}
            type="password"
            fullWidth />
          <Button
            bsStyle="primary"
            block
            type="submit"
            disabled={this.props.invalid || this.props.submitting}>
            Login
          </Button>
        </form>
      </Panel>
      );
  }
}
