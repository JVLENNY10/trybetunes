import React from 'react';

import '../css/pages/favorites.css';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoanding: true,
      songs: [],
    };

    this.loadFavoritesSongs = this.loadFavoritesSongs.bind(this);
  }

  componentDidMount() {
    this.loadFavoritesSongs();
  }

  async loadFavoritesSongs() {
    const songs = await getFavoriteSongs();
    this.setState({ isLoanding: false, songs });
  }

  render() {
    const { isLoanding, songs } = this.state;

    return (
      <div className="page-favorites" data-testid="page-favorites">
        <Header />

        {
          isLoanding ? <Loading /> : (
            <>
              <h1 className="favorites-title">Músicas Favoritas:</h1>

              {
                songs.map((song) => (
                  <MusicCard
                    audioComponent="audio-component"
                    checkboxMusicTrackId={ `checkbox-music-${song.trackId}` }
                    key={ song.trackId }
                    loadFavoritesSongs={ this.loadFavoritesSongs }
                    previewUrl={ song.previewUrl }
                    song={ song }
                    trackId={ song.trackId }
                    trackName={ song.trackName }
                  />
                ))
              }
            </>
          )
        }
      </div>
    );
  }
}

export default Favorites;
