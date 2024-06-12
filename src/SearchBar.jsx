import MovieList from './MovieList';
import './SearchBar.css'

function SearchBar({ handleSearch }) {

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const movieName = formData.get('movieName')
    searchQuery(movieName)
    // make API call
    // store results in a variable
    // handleSearch(movieData)


    event.target.reset();
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
        className="search-input"
        type="text" name="movieName"
        placeholder="Search for movies"
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <MovieList/>
    </>

  );
}

export default SearchBar

// how to show search results in a different page
//the different apge should have a button that takes you back to a list of "now showing" movies (original)
