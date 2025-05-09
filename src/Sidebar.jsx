import React from 'react';
import './Sidebar.css';

const Sidebar = ({ favorites, watched, closeSideBar }) => {
  return (
    <div className="sidebar">
        <button className="closeSidebarButton" onClick={closeSideBar}>X</button>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies.</p>
      ) : (
        <ul>
          {favorites.map((movie, i) => (
            <li key={i}>{movie.title}</li>
          ))}
        </ul>
      )}
      <h2>Watched</h2>
      {watched.length === 0 ? (
        <p>No watched movies.</p>
      ) : (
        <ul>
          {watched.map((movie, i) => (
            <li key={i}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
