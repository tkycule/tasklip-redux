import React from "react";

import { Button, Panel } from "react-bootstrap";
import { Input } from "formsy-react-components";
import Form from "formsy-react-components/release/form";
import { errorMessages } from "utils";

export default class Register extends React.Component {
  static propTypes = {
    register: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
    };
    this.enableButton = ::this.enableButton;
    this.disableButton = ::this.disableButton;
    this.onSubmit = ::this.onSubmit;
  }

  onSubmit(data) {
    this.props.register({
      email: data.email,
      password: data.password,
    });
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  render() {
    return (
      <Panel>
        <Form
          layout="vertical"
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onSubmit={this.onSubmit}>
          <Input
            name="email"
            type="email"
            label="Email"
            value=""
            validations="isEmail"
            validationErrors={errorMessages()}
            fullWidth
            required />
          <Input
            type="password"
            name="password"
            label="Password"
            value=""
            validations="minLength:8,maxLength:64"
            validationErrors={errorMessages({
                                minLength: 8,
                                maxLength: 64,
                              })}
            fullWidth
            required />
          <Input
            type="password"
            name="password_confirmation"
            label="Password (Confirmation)"
            value=""
            validations="equalsField:password"
            validationErrors={errorMessages({
                                equalsField: "Password",
                              })}
            fullWidth
            required />
          <Button
            type="submit"
            block
            bsStyle="primary"
            disabled={!this.state.canSubmit}>
            Register
          </Button>
        </Form>
      </Panel>
      );
  }
}
