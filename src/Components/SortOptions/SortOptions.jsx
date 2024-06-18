import React from "react";
import './SortOptions.css'

const SortOptions = ({ sortOption, handleSortChange }) => {

    return (
        <select className="sort" onChange={handleSortChange} value={sortOption}>
            <option value="alphabetic">A-Z</option>
            <option value="releaseDate">Release Date</option>
            <option value="rating">Rating</option>
        </select>
    );
};

export default SortOptions;