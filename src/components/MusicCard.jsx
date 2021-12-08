import React from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = { favoriteSongs: [], isFavorite: false, loading: false };
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
    return favoriteSongs.some((music) => music.trackId === trackId);
  }

  loadFavoriteSongs() {
    this.setState({ loading: true });
    getFavoriteSongs().then((song) => (
      this.setState({ favoriteSongs: song, loading: false },
        () => this.setState({ isFavorite: this.checkFavoriteSongs() }))));
  }

  // João Victor Veidz(T16) me ajudou a chegar na lógica do if else e depois setar o estado de acordo com a condição.
  markCheckbox() {
    const { song } = this.props;
    const { isFavorite } = this.state;
    if (!isFavorite) {
      this.setState({ isFavorite: true, loading: true });
      addSong(song).then(() => this.setState({ loading: false }));
    } else {
      this.setState({ isFavorite: false });
    }
  }

  render() {
    const { isFavorite, loading } = this.state;
    const {
      audioComponent,
      checkboxMusicTrackId,
      previewUrl,
      trackName,
    } = this.props;

    return (
      <div className="music">
        <h4>{ trackName }</h4>

        <audio data-testid={ audioComponent } src={ previewUrl } controls>
          <track kind="captions" />
        </audio>

        {
          loading ? <Loading /> : (
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

MusicCard.propTypes = {
  audioComponent: propTypes.string.isRequired,
  checkboxMusicTrackId: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  song: propTypes.shape().isRequired,
  trackId: propTypes.number.isRequired,
  trackName: propTypes.string.isRequired,
};

export default MusicCard;
