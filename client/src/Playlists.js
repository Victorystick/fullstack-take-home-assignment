import { createContext, useEffect, useReducer, useState } from "react";

// Adds the playlists context.
export function Playlists({ children }) {
  const [fetchCount, setFetchCount] = useState(0);
  const refetch = () => setFetchCount(fetchCount + 1);

  useEffect(() => {
    const controller = new AbortController()

    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors", signal: controller.signal })
      .then((res) => res.json())
      // Keep sorted by creation time.
      .then((data) => setPlaylists(data.sort((a, b) => new Date(a.created) < new Date(b.created))));

    return () => controller.abort();
  }, [fetchCount])

  const [playlists, setPlaylists] = useState([]);

  function remove(playlist) {
    fetch(`http://0.0.0.0:8000/playlists/${playlist.id}`, { method: 'DELETE', mode: "cors" })
      .then((res) => res.json())
      .then(() => refetch());
  }

  function create(name) {
    fetch(`http://0.0.0.0:8000/playlists/`, {
      method: 'POST',
      mode: "cors",
      // TODO: Create ids server side. Need to read up on this in Django REST.
      body: JSON.stringify({ id: crypto.randomUUID().slice(0, 8), name, tracks: [] }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then(() => refetch());
  }

  function update(playlist) {
    fetch(`http://0.0.0.0:8000/playlists/${playlist.id}/`, {
      method: 'PUT',
      mode: "cors",
      body: JSON.stringify(playlist),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then(() => refetch());
  }

  function addTrack(playlist, track) {
    update({ ...playlist, tracks: [...playlist.tracks, track.id] });
  }

  function removeTrack(playlist, track) {
    update({ ...playlist, tracks: playlist.tracks.filter(id => id !== track.id) });
  }

  const actions = {
    addTrack,
    removeTrack,
    create,
    remove
  };

  return <PlaylistsContext.Provider value={playlists}>
    <PlaylistActionsContext.Provider value={actions}>
      {children}
    </PlaylistActionsContext.Provider>
  </PlaylistsContext.Provider>;
}

export const PlaylistsContext = createContext([]);
export const PlaylistActionsContext = createContext();
