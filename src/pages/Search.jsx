import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      search: '',
    };

    this.buttonEnabled = this.buttonEnabled.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target }) {
    const { value } = target;

    this.setState({ search: value },
      () => this.setState({ buttonDisabled: this.buttonEnabled() }));
  }

  buttonEnabled() {
    const { search } = this.state;
    if (search.length >= 2) return false;
    return true;
  }

  render() {
    const { buttonDisabled, search } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            name="search"
            onChange={ this.onInputChange }
            type="text"
            value={ search }
          />

          <button
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
