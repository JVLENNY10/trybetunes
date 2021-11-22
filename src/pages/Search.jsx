import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      albums: [],
      buttonDisabled: true,
      input: '',
      loading: false,
      resultMessage: '',
      searched: false,
    };

    this.enableButton = this.enableButton.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  enableButton() {
    const { input } = this.state;
    if (input.length >= 2) return false;
    return true;
  }

  inputChange({ target }) {
    const { value } = target;
    this.setState({ input: value },
      () => this.setState({ buttonDisabled: this.enableButton() }));
  }

  submitButton(event) {
    event.preventDefault();
    const { input } = this.state;
    this.setState({ input: '', loading: true });
    // Emerson(T16) e Rafael Santos(T16) me ajudaram a posicionar o albums corretamente.
    searchAlbumsAPI(input).then((objectsAlbums) => this.setState({
      albums: objectsAlbums,
      buttonDisabled: true,
      loading: false,
      searched: true,
      resultMessage: ` ${input}`,
    }));
  }

  render() {
    const {
      albums,
      buttonDisabled,
      input,
      loading,
      resultMessage,
      searched,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <input
            data-testid="search-artist-input"
            name={ input }
            onChange={ this.inputChange }
            type="text"
            value={ input }
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
          searched && (
            albums.length > 0 ? (
              <section>
                <h4>
                  Resultado de álbuns de:
                  { resultMessage }
                </h4>

                <section>
                  {
                    albums.map((album) => (
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
