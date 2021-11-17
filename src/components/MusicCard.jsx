import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { dataTestId, musicKey, previewUrl, trackName } = this.props;

    return (
      <section key={ musicKey }>
        <p>{ trackName }</p>
        <audio data-testid={ dataTestId } src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
      </section>
    );
  }
}

MusicCard.propTypes = {
  dataTestId: propTypes.string.isRequired,
  musicKey: propTypes.number.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackName: propTypes.string.isRequired,
};

export default MusicCard;
