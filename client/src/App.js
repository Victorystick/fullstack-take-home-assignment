import React, { useContext, useState, useEffect, useMemo } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import TrackRow from "./components/TrackRow";
import PlaylistRow from "./components/PlaylistRow";
import { PlaylistActionsContext, PlaylistsContext } from "./Playlists";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [tracks, setTracks] = useState([]);
  const trackMap = useMemo(() => new Map(tracks.map((track) => [track.id, track])), [tracks]);

  const [playState, setPlayState] = useState();

  // Play a single track.
  function playTrack(track) {
    // setPlayState({tracks: [track], index: 0});
    // Alternatively, let any listed song be played.
    setPlayState({tracks, index: tracks.indexOf(track)});
  }

  // Or an entire playlist.
  function playPlaylist(playlist, track) {
    const tracks = playlist.tracks.map(id => trackMap.get(id));
    setPlayState({tracks, index: playlist.tracks.indexOf(track.id)});
  }
  const currentTrack = useMemo(() => playState ? playState.tracks[playState.index] : undefined, [playState]);

  // Tabs; one of tracks or playlists.
  const [tab, setTab] = useState('tracks');
  const tabs = [
    { label: 'Tracks', key: 'tracks' },
    { label: 'Playlists', key: 'playlists' },
  ];

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  return (
    <>
      <main className={styles.app}>
        <Nav tabs={tabs} tab={tab} setTab={setTab} />
        {tab === 'tracks' ? tracks.map((track) => (
          // Prefer id to index, to allow reordering elements.
          <TrackRow key={track.id} track={track} handlePlay={playTrack} />
        )) : <Playlists tracks={trackMap} currentTrack={currentTrack} playPlaylist={playPlaylist} />}
      </main>
      {playState && <AudioPlayer playState={playState} setPlayState={setPlayState} />}
    </>
  );
}

export default App;

function Nav({ tabs, tab, setTab }) {
  return <nav>
    <img src={logo} className={styles.logo} alt="Logo" />
    <ul className={styles.menu}>
      {tabs.map(({ label, key }) => (
        <li key={key}>
          <a href="#" className={tab === key ? styles.active : undefined} onClick={() => setTab(key)}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>;
}

function Playlists({ currentTrack, tracks, playPlaylist }) {
  const playlists = useContext(PlaylistsContext);
  const actions = useContext(PlaylistActionsContext);

  const [name, setName] = useState('');
  function createPlaylist(event) {
    event.preventDefault();

    actions.create(name);
    setName('');
  }

  return <div>
    <form onSubmit={createPlaylist}>
      <input kind="text" placeholder="New playlist" value={name} onChange={(e) => setName(e.target.value)}></input>
      <button type="submit">Create</button>
    </form>
    {playlists.map((playlist) => (
      <PlaylistRow key={playlist.id} playlist={playlist} tracks={tracks} track={currentTrack} playPlaylist={playPlaylist} />
    ))}
  </div>;
}