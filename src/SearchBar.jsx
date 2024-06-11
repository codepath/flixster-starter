import './SearchBar.css'

function SearchBar({posts, setSearchResults}) {
  return (
    <>
      <input type="text" placeholder="Search for movies" onSubmit={handleSubmit} onChange={handleSearchChange}/>
      <button>Search</button>
    </>
  )
}

export default SearchBar;
