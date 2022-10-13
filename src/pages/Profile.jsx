import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userInfos: {},
    };

    this.loadUserInfos = this.loadUserInfos.bind(this);
  }

  componentDidMount() {
    this.loadUserInfos();
  }

  async loadUserInfos() {
    const userInfos = await getUser();
    this.setState({ isLoading: false, userInfos });
  }

  render() {
    const { isLoading, userInfos } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />

        {
          isLoading ? <Loading /> : (
            <div>
              <img
                alt={ `Foto de ${userInfos.name}` }
                data-testid="profile-image"
                src={ userInfos.image }
              />

              <Link className="album" to="/profile/edit">
                Editar perfil
              </Link>

              <h2>Nome:</h2>
              <span>{ userInfos.name }</span>

              <h2>E-Mail:</h2>
              <span>{ userInfos.email }</span>

              <h2>Descrição:</h2>
              <p>{ userInfos.description }</p>
            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;
