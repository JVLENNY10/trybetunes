import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userName: '',
    };

    this.printLoading = this.printLoading.bind(this);
  }

  // Ju Barcelos(T16) me ajudou com essa parte do componentDidMount().
  componentDidMount() {
    this.printLoading();
  }

  printLoading() {
    getUser().then((user) => this.setState({
      userName: user.name, loading: false,
    }));
  }

  render() {
    const { loading, userName } = this.state;

    return (
      <header data-testid="header-component">
        {
          loading ? <Loading /> : (
            <h3 data-testid="header-user-name">
              { userName }
            </h3>
          )
        }

        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
