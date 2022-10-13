import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      description: '',
      email: '',
      image: '',
      isLoading: true,
      isRedirecting: false,
      name: '',
    };

    this.enableButton = this.enableButton.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.loadUserInfos = this.loadUserInfos.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  componentDidMount() {
    this.loadUserInfos();
  }

  enableButton() {
    const { description, email, image, name } = this.state;

    if (
      description !== ''
      && email !== ''
      && image !== ''
      && name !== ''
      && email.includes('@')
      && email.split('@')[0]
    ) {
      this.setState({ buttonDisabled: false });
    }
  }

  inputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableButton());
  }

  async loadUserInfos() {
    const { description, email, image, name } = await getUser();

    this.setState({ description, email, image, isLoading: false, name },
      () => this.enableButton());
  }

  async submitButton(event) {
    event.preventDefault();
    const { description, email, image, name } = this.state;

    this.setState({ isRedirecting: true });
    await updateUser({ description, email, image, name });
  }

  render() {
    const {
      buttonDisabled,
      description,
      email,
      image,
      isLoading,
      isRedirecting,
      name,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />

        {
          isLoading ? <Loading /> : (
            <form>
              <h2>Nova imagem:</h2>
              <input
                data-testid="edit-input-image"
                name="image"
                onChange={ this.inputChange }
                type="text"
                value={ image }
              />

              <h2>Novo nome:</h2>
              <input
                data-testid="edit-input-name"
                name="name"
                onChange={ this.inputChange }
                type="text"
                value={ name }
              />

              <h2>Novo E-Mail:</h2>
              <input
                data-testid="edit-input-email"
                name="email"
                onChange={ this.inputChange }
                type="text"
                value={ email }
              />

              <h2>Nova descrição:</h2>
              <input
                data-testid="edit-input-description"
                name="description"
                onChange={ this.inputChange }
                type="text"
                value={ description }
              />

              <button
                data-testid="edit-button-save"
                disabled={ buttonDisabled }
                onClick={ this.submitButton }
                type="submit"
              >
                Editar perfil
              </button>
            </form>
          )
        }

        { isRedirecting && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
