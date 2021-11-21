import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      loading: false,
    };

    this.markCheckbox = this.markCheckbox.bind(this);
  }

  markCheckbox(music) {
    const { isFavorite } = this.state;
    if (!isFavorite) {
      this.setState({ isFavorite: true, loading: true });
      addSong(music).then(() => this.setState({ loading: false }));
    } else this.setState({ isFavorite: false });
  }

  render() {
    const { isFavorite, loading } = this.state;
    const { audioComponent, checkboxMusicTrackId, music, previewUrl,
      trackName } = this.props;

    return (
      <div>
        <p>{ trackName }</p>

        <audio data-testid={ audioComponent } src={ previewUrl } controls>
          <track kind="captions" />
        </audio>

        <label htmlFor={ checkboxMusicTrackId }>
          <input
            checked={ isFavorite }
            data-testid={ checkboxMusicTrackId }
            id={ checkboxMusicTrackId }
            onChange={ () => this.markCheckbox(music) }
            type="checkbox"
          />
          Favorita
        </label>

        { loading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  audioComponent: propTypes.string.isRequired,
  checkboxMusicTrackId: propTypes.string.isRequired,
  music: propTypes.shape().isRequired,
  previewUrl: propTypes.string.isRequired,
  trackName: propTypes.string.isRequired,
};

export default MusicCard;
