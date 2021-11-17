import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      arrayMusics: [],
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

  loadMusics(albumId) {
    getMusics(albumId)
      .then((objectsMusics) => this.setState({ arrayMusics: objectsMusics }));
  }

  render() {
    const { arrayMusics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        {
          arrayMusics.map((music, index) => (
            index === 0 ? (
              <section>
                <h3 data-testid="album-name">{ music.collectionName }</h3>
                <h4 data-testid="artist-name">{ music.artistName }</h4>
              </section>
            ) : (
              <MusicCard
                dataTestId="audio-component"
                musicKey={ music.trackId }
                previewUrl={ music.previewUrl }
                trackName={ music.trackName }
              />
            )
          ))
        }
      </div>
    );
  }
}

export default Album;
