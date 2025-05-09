import React from 'react';
import './Side.css';

const Side = ({ isOpen, onClose, favorites, watchlist }) => {
  return (
    <div className={`side ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>Close</button>
      <div className="side-content">
        <h2>Favorites</h2>
        <ul>
          {favorites.map(movie => ( // map each favorite/watchlist movie onto a li element
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
        <h2>Watchlist</h2>
        <ul>
          {watchlist.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Side;
