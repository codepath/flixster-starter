import './SearchBar.css';

function SearchBar(){

    

    return(
        <>
            <div id='search'>
                <input className='search-form-container' placeholder='Search for movies...'></input>
                <button className='searchBtn'>Search</button>
                <button className='sortBtn'>Sort</button>
            </div>
        </>
    );
}


export default SearchBar;