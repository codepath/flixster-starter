import React from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import './Header.css'; 

const Header = ({ handleViewChange, activeView, handleSearchTerm }) => {
    return (
        <>
        <header className="my-header">
            <h1 className="title">Flixster</h1>
            {/* <div className="button-container">
                <button 
                    onClick={() => handleViewChange("nowPlaying")} 
                    className="now-playing-button"
                >
                    Now Playing
                </button>
                <button 
                    onClick={() => handleViewChange("search")} 
                    className="search-button"
                >
                    Search
                </button>
            </div>
            {activeView === "search" && <SearchForm onSearchChange={handleSearchTerm} />} */}
            <nav className="nav-bar"></nav>
        </header>
        </>
    );
};

export default Header;
