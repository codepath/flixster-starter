// App.jsx
import React, { useState } from "react";
import "./App.css";
import MovieList from "./MovieList";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="App">
      <header className="App-header">
        {!isSidebarOpen && (
          <div className="btn-wrapper" onClick={toggleSidebar}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        )}
        <div className="title">
          <h1>Flixster</h1>
          <img src="movie.png" alt="" />
        </div>
      </header>
      <MovieList isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <footer className="App-footer">
        <a href="https://www.linkedin.com/in/boris-hernandez-jr/">
          Learn More!
        </a>
      </footer>
    </div>
  );
};

export default App;
