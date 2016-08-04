import React from "react";

import { Button, Panel } from "react-bootstrap";
import { Input } from "formsy-react-components";
import Form from "formsy-react-components/release/form";

let errorMessages = {
  isEmail: "invalid format",
  minLength: "greater than 8",
  maxLength: "less than 64"
};

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    };
  }

  static propTypes = {
    login: React.PropTypes.func.isRequired
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  onSubmit(data) {
    this.props.login({
      email: data.email,
      password: data.password
    });
  }

  render() {
    return (
      <Panel>
        <Form
          layout="vertical"
          onValid={::this.enableButton}
          onInvalid={::this.disableButton}
          onSubmit={::this.onSubmit}>
          <Input
            name="email"
            label="Email"
            value=""
            validations="isEmail"
            validationErrors={errorMessages}
            fullWidth={true}
            required/>
          <Input
            type="password"
            name="password"
            label="Password"
            value=""
            validations="minLength:8,maxLength:64"
            validationErrors={errorMessages}
            fullWidth={true}
            required/>
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
