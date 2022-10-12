import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      musics: [],
    };

    this.loadMusics = this.loadMusics.bind(this);
  }

  componentDidMount() {
    // Descobri como pegar a URL atual nesses sites:
    // https://qastack.com.br/programming/1034621/get-the-current-url-with-javascript
    // https://pt.stackoverflow.com/questions/76394/como-fa%C3%A7o-para-pegar-url-atual-em-javascript
    const albumId = window.location.pathname.split('/');
    this.loadMusics(albumId[albumId.length - 1]);
  }

  async loadMusics(albumId) {
    const musics = await getMusics(albumId);
    this.setState({ loading: false, musics });
  }

  render() {
    const { loading, musics } = this.state;

    return (
      <div className="album-musics" data-testid="page-album">
        <Header />

        {
          loading ? <Loading /> : (
            musics.map((song, index) => (
              index === 0 ? (
                <div className="album-informations" key={ song.collectionId }>
                  <img alt={ song.collectionName } src={ song.artworkUrl100 } />
                  <h4 data-testid="album-name">{ song.collectionName }</h4>
                  <h5 data-testid="artist-name">{ song.artistName }</h5>
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
          )
        }
      </div>
    );
  }
}

export default Album;
