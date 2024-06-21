import { useEffect, useState } from 'react';
import './App.css';


const Search = (props) => {
    return (
        <div>
            <form className="searchForm">
                <input type="text" value={props.searchValue} onChange={(event) => props.setSearchValue(event.target.value)} placeholder="Search" id="search-bar"></input>
                <button type="submit" id="search-button" >🔍</button>
            </form>
        </div>
    )
}

export default Search
