import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      arrayResults: [],
      buttonDisabled: true,
      loading: false,
      results: false,
      resultsMessage: '',
      search: '',
    };

    this.buttonEnabled = this.buttonEnabled.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
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

  submitButton() {
    const { search } = this.state;
    this.setState({ loading: true, search: '' });
    // Emerson(T16) e Rafael Santos(T16) me ajudaram a posicionar o arrayResults corretamente.
    searchAlbumsAPI(search).then((promise) => this.setState({
      arrayResults: promise,
      buttonDisabled: true,
      loading: false,
      results: true,
      resultsMessage: ` ${search}`,
    }));
  }

  render() {
    const { arrayResults, buttonDisabled, loading, results, resultsMessage,
      search } = this.state;

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

          {
            loading ? <Loading /> : (
              <button
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.submitButton }
                type="button"
              >
                Pesquisar
              </button>
            )
          }

          {
            results && (
              arrayResults.length > 0 ? (
                <section>
                  <p>
                    Resultado de álbuns de:
                    { resultsMessage }
                  </p>

                  <section>
                    {
                      arrayResults.map((result) => (
                        <Link
                          data-testid={ `link-to-album-${result.collectionId}` }
                          key={ result.collectionId }
                          to={ `/album/${result.collectionId}` }
                        >
                          <img
                            alt={ result.collectionName }
                            src={ result.artworkUrl100 }
                          />
                          <h4>{ result.collectionName }</h4>
                        </Link>
                      ))
                    }
                  </section>
                </section>
              ) : 'Nenhum álbum foi encontrado'
            )
          }
        </form>
      </div>
    );
  }
}

export default Search;
