import React, { useContext } from "react";
import styles from "./TrackRow.module.css";
import RoundButton, { SmallButton } from "./RoundButton";
import { PlaylistActionsContext } from "../Playlists";
import TrackRow from "./TrackRow";

function PlaylistRow({ playlist, track, tracks, playPlaylist }) {
  const actions = useContext(PlaylistActionsContext);

  return (
    <div>
      <div className={styles.trackRow}>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{playlist.name}</div>
          <div className={styles.trackArtist}>
            id: {playlist.id}
          </div>
        </div>
        <div className={styles.actions}>
          {track ? <RoundButton icon="add" onClick={() => actions.addTrack(playlist, track)} /> : undefined}
          <RoundButton icon="delete" onClick={() => actions.remove(playlist)} />
        </div>
      </div>
      <div>
        {playlist.tracks.map(id => {
          const track = tracks.get(id);
          if (!track) throw new Error(`Missing track for ${id}`);
          return <TrackRow key={id} track={track} handlePlay={() => playPlaylist(playlist, track)}>
            <SmallButton icon='delete' onClick={() => actions.removeTrack(playlist, track)} />
          </TrackRow>
        })}
      </div>
    </div>
  );
}

export default PlaylistRow;
