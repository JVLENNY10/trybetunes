import React from 'react';
import { Link } from 'react-router-dom';

import '../css/pages/profile.css';
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
      <div className="page-profile" data-testid="page-profile">
        <Header />

        {
          isLoading ? <Loading /> : (
            <>
              <h1>Perfil</h1>

              <div className="profile">
                <img
                  alt={ `Foto de ${userInfos.name}` }
                  data-testid="profile-image"
                  src={ userInfos.image }
                />

                <section className="profile-infos">
                  <h2>Nome: </h2>
                  <p>{ userInfos.name }</p>

                  <h2>E-Mail: </h2>
                  <p>{ userInfos.email }</p>

                  <h2>Descrição: </h2>
                  <p>{ userInfos.description }</p>
                </section>

                <Link className="edit-profile" to="/profile/edit">
                  <p>Editar perfil</p>
                </Link>
              </div>
            </>
          )
        }
      </div>
    );
  }
}

export default Profile;
