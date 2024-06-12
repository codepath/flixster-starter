
//import './Header.css'; // Import the CSS file for the header

import React from 'react';
import './Header.css';

function Header({ setSearching, sortMovies }) {
  return (
    <div className="header">
      <h1>Flixster</h1>
      <div className="toggle-button">
        <button onClick={() => setSearching(false)}>Now Playing</button>
        <button onClick={() => setSearching(true)}>Search</button>
        <select className="sort-by" onChange={(e) => sortMovies(e.target.value)}>
          <option value="title">Sort by Title</option>
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
    </div>
  );
}

export default Header;