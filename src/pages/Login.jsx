import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carreagando from '../components/Carregando';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      buttonDisabled: true,
      redirect: false,
      loading: false,
    };

    this.buttonEnabled = this.buttonEnabled.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  onInputChange({ target }) {
    const { value } = target;

    this.setState({
      nameInput: value,
    }, () => {
      this.setState({
        buttonDisabled: this.buttonEnabled(),
      });
    });
  }

  buttonEnabled() {
    const minInput = 3;
    const { nameInput } = this.state;
    if (nameInput.length >= minInput) return false;
    return true;
  }

  submitButton() {
    const { nameInput } = this.state;
    this.setState({ loading: true });
    createUser({ name: nameInput })
      .then(() => this.setState({ redirect: true, loading: false }));
  }

  render() {
    const { nameInput, buttonDisabled, redirect, loading } = this.state;

    return (
      <div data-testid="page-login">
        <form onSubmit={ this.submitButton }>
          <input
            data-testid="login-name-input"
            name="nameInput"
            onChange={ this.onInputChange }
            placeholder="Seu nome aqui"
            type="text"
            value={ nameInput }
          />

          <button
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onClick={ this.submitButton }
            type="button"
          >
            Entrar
          </button>
        </form>

        { loading && <Carreagando /> }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
