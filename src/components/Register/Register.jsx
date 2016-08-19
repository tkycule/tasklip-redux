import React from "react";

import { Button, Panel } from "react-bootstrap";
import { Input } from "formsy-react-components";
import Form from "formsy-react-components/release/form";
import { errorMessages } from "utils";

export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    };
  }

  static propTypes = {
    register: React.PropTypes.func.isRequired
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
    this.props.register({
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
            type="email"
            label="Email"
            value=""
            validations="isEmail"
            validationErrors={errorMessages()}
            fullWidth={true}
            required/>
          <Input
            type="password"
            name="password"
            label="Password"
            value=""
            validations="minLength:8,maxLength:64"
            validationErrors={errorMessages({
                                minLength: 8,
                                maxLength: 64
                              })}
            fullWidth={true}
            required/>
          <Input
            type="password"
            name="password_confirmation"
            label="Password (Confirmation)"
            value=""
            validations="equalsField:password"
            validationErrors={errorMessages({
                                equalsField: "Password"
                              })}
            fullWidth={true}
            required/>
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
