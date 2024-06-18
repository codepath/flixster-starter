import React from "react";
import './SortOptions.css'

const SortOptions = ({ sortOption, handleSortChange }) => {
    // const handleSortChange = (event) => {
    //     onSortChange(event.target.value);
    // };

    return (
        // <div className="sort-options">
            // <label htmlFor="sort">Sort by:</label>
            <select id="sort" onChange={handleSortChange} value={sortOption}>
                <option value="alphabetic">Alphabetic A-Z</option>
                <option value="releaseDate">Release Date</option>
                <option value="rating">Rating</option>
            </select>
    );
};

export default SortOptions;