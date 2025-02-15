import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Load playlist from local storage on mount
  useEffect(() => {
    const savedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    setPlaylist(savedPlaylist);
  }, []);

  // Save playlist to local storage whenever playlist change
  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const addNote = () => {
    if (newNote.trim() === "") return;
    setPlaylist([...playlist, newNote]);
    setNewNote("");
  };

  const deleteNote = (index) => {
    const updatedPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(updatedPlaylist);
  };

  return (
    <div className="app">
      <h1>Playlist App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter a song..."
        />
        <button onClick={addNote}>Add Song</button>
      </div>
      <ul className="playlist-list">
        {playlist.map((note, index) => (
          <li key={index} className="note-item">
            {note}
            <button className="delete-button" onClick={() => deleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
