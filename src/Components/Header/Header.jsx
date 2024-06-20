import React from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import './Header.css'; 

const Header = ({ handleViewChange, activeView, handleSearchTerm }) => {
    return (
        <>
        <header className="my-header">
            <h1 className="title">Flixster 🎬</h1>
        </header>
        </>
    );
};

export default Header;
