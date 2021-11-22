import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = { musics: [] };
    this.loadMusics = this.loadMusics.bind(this);
  }

  componentDidMount() {
    // Descobri como pegar a URL atual nesses sites:
    // https://qastack.com.br/programming/1034621/get-the-current-url-with-javascript
    // https://pt.stackoverflow.com/questions/76394/como-fa%C3%A7o-para-pegar-url-atual-em-javascript
    const albumId = window.location.pathname.split('/');
    this.loadMusics(albumId[albumId.length - 1]);
  }

  loadMusics(albumId) {
    getMusics(albumId).then((musicObjects) => this.setState({ musics: musicObjects }));
  }

  render() {
    const { musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        {
          musics.map((song, index) => (
            index === 0 ? (
              <div key={ song.collectionId }>
                <h3 data-testid="album-name">{ song.collectionName }</h3>
                <h4 data-testid="artist-name">{ song.artistName }</h4>
              </div>
            ) : (
              <MusicCard
                audioComponent="audio-component"
                checkboxMusicTrackId={ `checkbox-music-${song.trackId}` }
                key={ song.trackId }
                previewUrl={ song.previewUrl }
                song={ song }
                trackId={ song.trackId }
                trackName={ song.trackName }
              />
            )
          ))
        }
      </div>
    );
  }
}

export default Album;
