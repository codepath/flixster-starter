import React, { useState } from "react";
import "./SideBar.css";
//purpose: add sidebar to hold liked and seen movies
const SideBar = ({
  lovedMovies,
  seenMovies,
  onMovieSelect,
  toggleSidebar,
  isSidebarOpen,
}) => {
  const [isDropdownOneOpen, setDropdownOneOpen] = useState(false);
  const [isDropdownTwoOpen, setDropdownTwoOpen] = useState(false);
  const toggleDropdownOne = () => {
    setDropdownOneOpen(!isDropdownOneOpen);
  };
  const toggleDropdownTwo = () => {
    setDropdownTwoOpen(!isDropdownTwoOpen);
  };

  return (
    <div
      className={`w3-sidebar w3-bar-block w3-card ${
        isSidebarOpen ? "open" : ""
      }`}
    >
      <button id="side-bar-close" onClick={toggleSidebar}>
        Close
      </button>
      <div className="dropdown">
        <button onClick={toggleDropdownOne}>Loved</button>
        {isDropdownOneOpen && (
          <div className="dropdown-content">
            {lovedMovies.map((movie) => (
              <a key={movie.id} onClick={() => onMovieSelect(movie.id)}>
                {movie.title}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="dropdown">
        <button onClick={toggleDropdownTwo}>Seen</button>
        {isDropdownTwoOpen && (
          <div className="dropdown-content">
            {seenMovies.map((movie) => (
              <a key={movie.id} onClick={() => onMovieSelect(movie.id)}>
                {movie.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
