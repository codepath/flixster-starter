import React from 'react';
import './Header.css';
import SortBy from './SortBy';

function Header({ setIsSearching, sortMovies }) {
  return (
    <header className="header">
      <h1>Flixster</h1>
      <div className="sort-container">
        <select className="sort-by" onChange={(e) => sortMovies(e.target.value)}>
          <option value="release_date">Sort by Date</option>
          <option value="vote_average">Sort by Rating</option>
          <option value="genre">Sort by Genre</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
