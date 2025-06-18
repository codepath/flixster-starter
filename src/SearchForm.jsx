import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch, onClear }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleClear = (e) => {
        e.preventDefault();
        setQuery('');
        onClear();
    };

    return (
        <div className="search-form">
            <form className="search-container" onSubmit={handleSubmit}>
                <input
                    className='search-bar'
                    type="text"
                    placeholder="Search for movies"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="search-button" type="submit">Search</button>
                <button className="clear-button" type="button" onClick={handleClear}>Clear</button>
            </form>
        </div>
    );
};

export default SearchForm;
