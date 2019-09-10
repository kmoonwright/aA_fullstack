import React from 'react';
import { connect } from 'react-redux';

import { fetchAllAlbums, fetchOneAlbum, fetchAllSongs } from '../actions/music_actions'


class ArtistIndexDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            artists: this.props.artists,
            songs: this.props.songs,
            albums: this.props.albums,
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <ul>
                {this.props.albums.map(album => {
                    let allsongs = this.props.songByAlbumId[album.id];
                    return (
                        <li key={album.id}>
                            <p>{album.title}</p>    
                            <ul>
                                {allsongs.map(song => {
                                    return (
                                        <li key={song.id}>
                                            {song.title}
                                        </li>
                                    )
                                })}
                            </ul>                     
                        </li>
                    )
                })}
            </ul>
        )
    }
}

const msp = (state, ownProps) => {
    const artistId = ownProps.match.params.artistId;
    let artist = state.entities.artists[artistId];
    let albums = Object.values(state.entities.albums).filter(album => album.artist_id.toString() === artistId);
    let albumIds = albums.map(album => album.id);
    let songs = {};
    let songObjects = Object.values(state.entities.songs);
    songObjects.forEach(song => {
        if (albumIds.includes(song.album_id)) {
            songs[song.album_id] = songs[song.album_id] || [];
            songs[song.album_id].push(song);
        }
    });

    return ({
        artist: artist,
        albums: albums,
        songByAlbumId: songs,
    })
}

const mdp = dispatch => ({
    fetchAllSongs: () => dispatch(fetchAllSongs()),
    fetchOneSong: (songId) => dispatch(fetchOneSong(songId)),
})

export default connect(msp, mdp)(ArtistIndexDetail);