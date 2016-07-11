import React from "react";

import { Card, CardHeader, CardText, CardActions } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import Formsy from "formsy-react";
import { FormsyText } from "formsy-material-ui/lib";

let errorMessages = {
  isEmail: "invalid format",
  minLength: "greater than 8",
  maxLength: "less than 64",
  equalsField: "doesn't match"
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

  onSubmit(data, resetForm) {
    this.props.login({
      email: data.email,
      password: data.password
    });
  }

  render() {
    return (
      <Formsy.Form onValid={::this.enableButton} onInvalid={::this.disableButton} onSubmit={::this.onSubmit}>
        <Card>
          <CardText>
            <FormsyText
              name="email"
              floatingLabelText="Email"
              validations="isEmail"
              validationErrors={errorMessages}
              fullWidth={true}
              defaultValue="a@a.com"
              required/>
            <FormsyText
              type="password"
              name="password"
              floatingLabelText="Password"
              validations="minLength:8,maxLength:64"
              validationErrors={errorMessages}
              fullWidth={true}
              defaultValue="password"
              required/>
            <FormsyText
              type="password"
              name="password_confirmation"
              floatingLabelText="Password (Confirmation)"
              validations="equalsField:password"
              validationErrors={errorMessages}
              fullWidth={true}
              defaultValue="password"
              required/>
          </CardText>
          <CardActions>
            <RaisedButton
              type="submit"
              label="Login"
              primary={true}
              disabled={!this.state.canSubmit} />
          </CardActions>
        </Card>
      </Formsy.Form>
      );
  }
}
