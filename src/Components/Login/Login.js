import React, { Component } from "react";
import "./Login.css";
import AcidrtContext from "../../AcidrtContext";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

class Login extends Component {
  static contextType = AcidrtContext;

  constructor() {
    super();
    this.state = {
      username: undefined,
      password: undefined,
      validation: "",
      usernameValid: false,
      passwordValid: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!!this.context.authToken) {
      this.context.clearError();
      this.props.history.push("/dashboard");
    }
  }

  handlePostSubmit = async (e) => {
    e.preventDefault();
    this.validateUsername(this.state.username);
    this.validatePassword(this.state.password);
    this.setState({ loading: true });
    await this.context.handlePostAuthenticate(this.state);
  };

  handleUsername = (e) => {
    let usernameInput = e.target.value;
    this.setState({ username: usernameInput }, () =>
      this.validateUsername(usernameInput)
    );
  };

  handlePassword = (e) => {
    let passwordInput = e.target.value;
    this.setState({ password: passwordInput }, () =>
      this.validatePassword(passwordInput)
    );
  };

  validateUsername = (username) => {
    let validationMessages;
    let hasError = false;

    if (!username) {
      hasError = true;
      validationMessages = " username cannot be blank ";
    } else {
      validationMessages = "";
    }

    this.setState(
      {
        usernameValid: !hasError,
        usernameValidation: validationMessages,
      },
      () => this.usernameValid(username)
    );
  };

  validatePassword = (password) => {
    let validationMessages;
    let hasError = false;

    if (!password) {
      hasError = true;
      validationMessages = " password cannot be blank ";
    } else {
      validationMessages = "";
    }

    this.setState(
      {
        passwordValid: !hasError,
        passwordValidation: validationMessages,
      },
      () => this.passwordValid(password)
    );
  };

  usernameValid = (username) => {
    if (this.state.username) {
      this.setState({ username });
    }
  };

  passwordValid = (password) => {
    if (this.state.password) {
      this.setState({ password });
    }
  };

  render() {
    return (
      <>
        {!!this.context.error ? <ErrorDisplay /> : ""}
        <main className="login-form">
          <section>
            <header>login to access reports</header>
            <p className="login-note">
              <em>
                For testing authorized user functionality, use:
                <br />
                username: acps-employee <br />
                password: ilovemywatershed
              </em>
            </p>
            <p>
              <em>
                <b>REMEMBER: You don't need an account to submit a report!</b>
              </em>
            </p>
          </section>
          <section>
            <form className="react-form" onSubmit={this.handlePostSubmit}>
              <label htmlFor="login-username">username: </label>
              <br />
              <input
                type="text"
                id="login-username"
                name="login-username"
                className="login-username"
                onChange={this.handleUsername}
                placeholder={"enter username"}
                aria-label="username"
                aria-required="true"
                aria-describedby="error-box"
              />
              <br />
              <label htmlFor="login-password">password: </label>
              <br />
              <input
                type="password"
                id="login-password"
                name="login-password"
                className="login-password"
                onChange={this.handlePassword}
                placeholder={"enter password"}
                aria-label="password"
                aria-required="true"
                aria-describedby="error-box"
              />
              <br />
              <button
                className="submit-button"
                type="submit"
                disabled={
                  !this.state.usernameValid ||
                  !this.state.passwordValid ||
                  this.state.loading
                }
              >
                Submit
              </button>
              <section
                className="error-box"
                id="error-box"
                aria-live="assertive"
              >
                {this.state.username !== undefined &&
                  this.state.usernameValidation}
                <br />
                {this.state.password !== undefined &&
                  this.state.passwordValidation}
              </section>
              <div>{this.state.loading ? `Loading...` : ""}</div>
            </form>
          </section>
        </main>
      </>
    );
  }
}

export default Login;
