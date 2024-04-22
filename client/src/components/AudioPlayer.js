import React, { useRef, useState, useEffect } from "react";
import styles from "./AudioPlayer.module.css";

function AudioPlayer({ playState, setPlayState }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = (e) => {
    // Don't update progress if duration is NaN.
    // When this happens the progress slider is set to 50%.
    if (!e.target.duration) return;
    setProgress(e.target.currentTime / e.target.duration);
  };

  const handleSliderChange = (e) => {
    audioRef.current.currentTime =
      (e.target.value / 1000) * audioRef.current.duration;
  };

  const handleTogglePlaybackClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    audioRef.current.addEventListener("play", handlePlay);
    audioRef.current.addEventListener("pause", handlePause);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
  }, []);

  useEffect(() => {
    audioRef.current.play();
    audioRef.current.currentTime = 0;
    setProgress(0);
  }, [playState]);

  const track = playState.tracks[playState.index];
  const prev = playState.index > 0 ? () => setPlayState({ ...playState, index: playState.index - 1 }) : undefined;
  const next = playState.index < playState.tracks.length - 1 ? () => setPlayState({ ...playState, index: playState.index + 1}) : undefined;

  return (
    <>
      <audio src={track.audio} ref={audioRef} />
      <div className={styles.audioPlayer}>
        <div className={styles.buttons}>
          <button className={styles.skipButton} disabled={!prev} onClick={prev}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Z" /></svg>
          </button>
          <button
            className={styles.togglePlaybackButton}
            onClick={handleTogglePlaybackClick}
          >
            {isPlaying ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 5H7V19H10V5ZM17 5H14V19H17V5Z"
                  fill="#000"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 12L8 5V19L20 12Z" fill="#000" />
              </svg>
            )}
          </button>
          <button className={styles.skipButton} disabled={!next} onClick={next}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Z" /></svg>
          </button>
        </div>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>
            {track.main_artists.join(", ")}
          </div>
        </div>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="1"
            max="1000"
            value={progress * 1000}
            className={styles.slider}
            onChange={handleSliderChange}
          />
        </div>
      </div>
    </>
  );
}

export default AudioPlayer;
