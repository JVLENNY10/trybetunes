import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import '../css/components/musicCard.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      isFavorite: false,
      isLoading: false,
    };

    this.checkFavoriteSongs = this.checkFavoriteSongs.bind(this);
    this.loadFavoriteSongs = this.loadFavoriteSongs.bind(this);
    this.markCheckbox = this.markCheckbox.bind(this);
  }

  componentDidMount() {
    this.loadFavoriteSongs();
  }

  checkFavoriteSongs() {
    const { trackId } = this.props;
    const { favoriteSongs } = this.state;
    return favoriteSongs.some((song) => song.trackId === trackId);
  }

  async loadFavoriteSongs() {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();

    this.setState({ favoriteSongs, isLoading: false },
      () => this.setState({ isFavorite: this.checkFavoriteSongs() }));
  }

  // João Victor Veidz(T16) me ajudou a chegar na lógica do if else e depois setar o estado de acordo com a condição.
  async markCheckbox() {
    const { isFavorite } = this.state;
    const endpoint = window.location.pathname;
    const { song, loadFavoritesSongs } = this.props;

    this.setState({ isLoading: true });

    if (!isFavorite) {
      await addSong(song);
      this.setState({ isFavorite: true });
    } else {
      await removeSong(song);

      if (endpoint === '/favorites') {
        await loadFavoritesSongs();
      }

      this.setState({ isFavorite: false });
    }

    this.setState({ isLoading: false });
  }

  render() {
    const { isFavorite, isLoading } = this.state;
    const { audioComponent, checkboxMusicTrackId, previewUrl, trackName } = this.props;

    return (
      <div className="music">
        <h4>{ trackName }</h4>

        <audio data-testid={ audioComponent } src={ previewUrl } controls>
          <track kind="captions" />
        </audio>

        {
          isLoading ? <Loading /> : (
            <label htmlFor={ checkboxMusicTrackId }>
              <input
                checked={ isFavorite }
                data-testid={ checkboxMusicTrackId }
                id={ checkboxMusicTrackId }
                onChange={ this.markCheckbox }
                type="checkbox"
              />
              Favorita
            </label>
          )
        }
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  audioComponent: PropTypes.string.isRequired,
  checkboxMusicTrackId: PropTypes.string.isRequired,
  loadFavoritesSongs: PropTypes.func.isRequired,
  previewUrl: PropTypes.string.isRequired,
  song: PropTypes.shape().isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};
