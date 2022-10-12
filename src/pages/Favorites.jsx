import React from 'react';
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

  // componentDidUpdate() {
  //   getFavoriteSongs().then((songs) => this.setState({ musics: songs }));
  // }

  async loadFavoritesSongs() {
    const songs = await getFavoriteSongs();
    this.setState({ isLoanding: false, songs });
  }

  render() {
    const { isLoanding, songs } = this.state;

    return (
      <div className="album-musics" data-testid="page-favorites">
        <Header />

        {
          isLoanding ? <Loading /> : (
            songs.map((song) => (
              <MusicCard
                audioComponent="audio-component"
                checkboxMusicTrackId={ `checkbox-music-${song.trackId}` }
                key={ song.trackId }
                previewUrl={ song.previewUrl }
                song={ song }
                trackId={ song.trackId }
                trackName={ song.trackName }
              />
            ))
          )
        }
      </div>
    );
  }
}

export default Favorites;
