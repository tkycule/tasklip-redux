import React from "react";

import { Button, Panel } from "react-bootstrap";
import { Input } from "formsy-react-components";
import Form from "formsy-react-components/release/form";
import { errorMessages } from "utils";

export default class Login extends React.Component {

  static propTypes = {
    login: React.PropTypes.func.isRequired,
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
    this.props.login({
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
          <Button
            bsStyle="primary"
            block
            type="submit"
            disabled={!this.state.canSubmit}>
            Login
          </Button>
        </Form>
      </Panel>
      );
  }
}
