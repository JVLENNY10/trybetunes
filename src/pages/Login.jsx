import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import trybeTunesIcon from '../icons/trybe-tunes-icon.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      input: '',
      loading: false,
      redirecting: false,
    };

    this.enableButton = this.enableButton.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  enableButton() {
    const minInput = 3;
    const { input } = this.state;

    if (input.length >= minInput) {
      return false;
    }

    return true;
  }

  inputChange({ target }) {
    const { value } = target;

    this.setState({ input: value },
      () => this.setState({ buttonDisabled: this.enableButton() }));
  }

  async submitButton(event) {
    event.preventDefault();
    const { input } = this.state;
    this.setState({ loading: true });

    await createUser({ name: input });
    this.setState({ loading: false, redirecting: true });
  }

  render() {
    const { buttonDisabled, input, loading, redirecting } = this.state;

    return (
      <div className="page-login" data-testid="page-login">
        <img alt="trybe-tunes-icon" src={ trybeTunesIcon } />

        {
          loading ? <Loading /> : (
            <form>
              <input
                data-testid="login-name-input"
                name={ input }
                onChange={ this.inputChange }
                placeholder="Seu nome aqui"
                type="text"
                value={ input }
              />

              <button
                data-testid="login-submit-button"
                disabled={ buttonDisabled }
                onClick={ this.submitButton }
                type="submit"
              >
                Entrar
              </button>
            </form>
          )
        }

        { redirecting && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
