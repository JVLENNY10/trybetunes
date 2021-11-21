import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      arrayAlbums: [],
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

  submitButton(event) {
    event.preventDefault();
    const { search } = this.state;
    this.setState({ loading: true, search: '' });
    // Emerson(T16) e Rafael Santos(T16) me ajudaram a posicionar o arrayAlbums corretamente.
    searchAlbumsAPI(search).then((objectsAlbums) => this.setState({
      arrayAlbums: objectsAlbums,
      buttonDisabled: true,
      loading: false,
      results: true,
      resultsMessage: ` ${search}`,
    }));
  }

  render() {
    const { arrayAlbums, buttonDisabled, loading, results, resultsMessage,
      search } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <input
            data-testid="search-artist-input"
            name={ search }
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
                type="submit"
              >
                Pesquisar
              </button>
            )
          }
        </form>

        {
          results && (
            arrayAlbums.length > 0 ? (
              <section>
                <h4>
                  Resultado de álbuns de:
                  { resultsMessage }
                </h4>

                <section>
                  {
                    arrayAlbums.map((album) => (
                      <Link
                        data-testid={ `link-to-album-${album.collectionId}` }
                        key={ album.collectionId }
                        to={ `/album/${album.collectionId}` }
                      >
                        <div>
                          <img
                            alt={ album.collectionName }
                            src={ album.artworkUrl100 }
                          />
                          <h4>{ album.collectionName }</h4>
                          <h5>{ album.artistName }</h5>
                        </div>
                      </Link>
                    ))
                  }
                </section>
              </section>
            ) : 'Nenhum álbum foi encontrado'
          )
        }
      </div>
    );
  }
}

export default Search;
