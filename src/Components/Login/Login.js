import React, { Component } from 'react';
import './Login.css'
import AcidrtContext from "../../AcidrtContext";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

class Login extends Component {

    static contextType = AcidrtContext;

    constructor() {
        super();
        this.state = {
            username: undefined,
            password: undefined,
            validation: '',
            usernameValid: false,
            passwordValid: false,
        }
    }

    componentDidMount() {
        this.validateUsername(this.state.username);
        this.validatePassword(this.state.password);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!!this.context.authToken && !!this.context.reports) {
            //this.context.clearError();
            this.props.history.push('/dashboard');
        }
    }

    handlePostSubmit = async (e) => {
        console.log('login being used?')
        e.preventDefault();
        await this.context.handlePostAuthenticate(this.state);
    }

    handleUsername = (e) => {
        let usernameInput = e.target.value;
        this.setState({ username: usernameInput }, () => this.validateUsername(usernameInput));
    }

    handlePassword = (e) => {
        let passwordInput = e.target.value;
        this.setState({ password: passwordInput }, () => this.validatePassword(passwordInput));
    }

    validateUsername = (username) => {
        let validationMessages;
        let hasError = false;

        if (!username) {
            hasError = true;
            validationMessages = ' username cannot be blank '
        }
        else {
            validationMessages = '';
        }

        this.setState({
            usernameValid: !hasError,
            usernameValidation: validationMessages,
        }, () => this.usernameValid(username))
    }

    validatePassword = (password) => {
        let validationMessages;
        let hasError = false;

        if (!password) {
            hasError = true;
            validationMessages = ' password cannot be blank '
        }
        else {
            validationMessages = '';
        }

        this.setState({
            passwordValid: !hasError,
            passwordValidation: validationMessages,
        }, () => this.passwordValid(password))
    }

    usernameValid = (username) => {
        if (this.state.username) {
            this.setState({username});
        }
    }

    passwordValid = (password) => {
        if (this.state.password) {
            this.setState({password})
        }
    }

    render() {
        return(
            <>
                {
                    (!!this.context.error)
                        ? <ErrorDisplay />
                        : ''
                }
                <main className="login-form">
                    <section>
                        <header>
                            login to access reports
                        </header>
                    </section>
                    <section>
                        <form
                            className='react-form'
                            onSubmit={this.handlePostSubmit}>
                            <label htmlFor='login-username'>username: </label>
                            <input
                                type="text"
                                id="login-username"
                                name="login-username"
                                className="login-username"
                                onChange={this.handleUsername}
                                placeholder={'enter username'}
                                aria-label="username"
                                aria-required="true"
                                aria-describedby="error-box"
                            />
                            <label htmlFor='login-password'>password: </label>
                            <input
                                type="text"
                                id="login-password"
                                name="login-password"
                                className="login-password"
                                onChange={this.handlePassword}
                                placeholder={'enter password'}
                                aria-label="password"
                                aria-required="true"
                                aria-describedby="error-box"
                            />
                            <button
                                className="submit-button"
                                type="submit"
                                disabled={!this.state.usernameValid || !this.state.passwordValid }>
                                Submit
                            </button>
                            <section className="error-box" id="error-box" aria-live="assertive">
                                {this.state.usernameValidation}
                                <br />
                                {this.state.passwordValidation}
                            </section>
                        </form>
                    </section>
                </main>
            </>
        );
    }
}

export default Login;