import React from "react";
import styles from "./TrackRow.module.css";
import RoundButton from "./RoundButton";

function TrackRow({ track, handlePlay, children }) {
  return (
    <div className={styles.trackRow}>
      <RoundButton icon="play" onClick={() => handlePlay(track)} />
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{track.title}</div>
        <div className={styles.trackArtist}>
          {track.main_artists.join(", ")}
        </div>
      </div>
      {children}
    </div>
  );
}

export default TrackRow;
