import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userName: '',
    };
  }

  componentDidMount() {
    getUser().then((user) => this.setState({ userName: user.name, loading: false }));
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
      </header>
    );
  }
}

export default Header;
