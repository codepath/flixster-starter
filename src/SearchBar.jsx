import './Searching.css';
function SearchBar({setSearchQuery}){
    return(
        <div className="search-container">
        <input type="text" placeholder="Search movies..." className="search-input" onChange={(e) => {setSearchQuery(e.target.value)}}/>
        </div>
    )
}

export default SearchBar;
