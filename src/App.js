import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [playingSong, setPlayingSong] = useState(null);

  // Fetch song suggestions from iTunes API
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=5`);
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle adding selected song to playlist
  const addSong = (song) => {
    setSongs([...songs, song]);
    setQuery("");
    setSuggestions([]);
  };

  // Handle play/pause functionality
  const togglePlay = (previewUrl) => {
    if (playingSong === previewUrl) {
      setPlayingSong(null);
    } else {
      setPlayingSong(previewUrl);
    }
  };

  return (
    <div className="app">
      <h1>Playlist App</h1>
      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          placeholder="Enter a song..."
        />
      </div>
      <ul className="suggestions">
        {suggestions.map((song) => (
          <li key={song.trackId} onClick={() => addSong(song)}>
            {song.trackName} - {song.artistName}
          </li>
        ))}
      </ul>
      <ul className="playlist">
        {songs.map((song, index) => (
          <li key={index} className="playlist-item">
            {song.trackName} - {song.artistName}
            {song.previewUrl && (
              <button onClick={() => togglePlay(song.previewUrl)}>
                {playingSong === song.previewUrl ? "Pause" : "Play"}
              </button>
            )}
            {playingSong === song.previewUrl && (
              <audio src={song.previewUrl} autoPlay onEnded={() => setPlayingSong(null)} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
