import React from 'react';
import './SortBy.css';

function SortBy({ setSortOption }) {
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <select className="sort-by" onChange={handleSortChange}>
            <option value="release_date">Sort by Date</option>
            <option value="vote_average">Sort by Rating</option>
            <option value="genre">Sort by Genre</option>
        </select>
    );
}

export default SortBy;
