import './App.css';
import MovieList from './MovieList';
import Search from './Search';
import Filter from './Filter';
import Sort from './Sort';
import Side from './Side';
import { useState, useEffect } from 'react';

function App() {
  //a central state object map for all elements that interact with api requests allows us to ensure all fetch requests are in sync with all current relevant values
  const [apiData, setApiData] = useState({
    search: '',
    page: 1,
    filters: [],
    sort: ''
  });
  const [movieData, setMovieData] = useState([]);
  const [sideOpen, setSideOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchData();
  }, [apiData]);

  //fetchData fetches data by inserting sort,search,and filter info onto the base API URL as needed and sets visible movies to correspond with API response
  const fetchData = async () => {
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&include_adult=false&include_video=false&page=${apiData.page}&api_key=${import.meta.env.VITE_API_KEY}`;

      if (apiData.search !== '') {
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(apiData.search)}&language=en-US&page=${apiData.page}&include_adult=false&api_key=${import.meta.env.VITE_API_KEY}`;
      }
      if (apiData.filters.length > 0) {
        url += `&with_genres=${apiData.filters.join(',')}`;
      }
      if (apiData.sort !== '') {
        url += `&sort_by=${apiData.sort}`
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies: ' + response.statusText);
      }
      const data = await response.json();
      // Update movieData by appending new results to existing data if not on the first page, otherwise replace existing data.
      setMovieData(prevData => apiData.page > 1 ? [...prevData, ...data.results] : [...data.results]);

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // All handlers work by updating the apiData state with new values for search, filters, sort, or page whenever relevant while maintaining unchanged fields
  const handleSearch = (query) => {
    setApiData({ ...apiData, search: query, page: 1 });
  };

  const handleFilter = (newFilters) => {
    setApiData({ ...apiData, filters: newFilters, page: 1 });
  };

  const handleSort = (newSort) => {
    setApiData({ ...apiData, sort: newSort, page: 1 });
  };

  const incrementPage = () => {
    setApiData({ ...apiData, page: apiData.page + 1 });
  };

  const toggleSide = () => {
    setSideOpen(!sideOpen);
  };

  const updateFavorites = (movie, add) => {
    setFavorites(prev => add ? [...prev, movie] : prev.filter(fav => fav.id !== movie.id));
  };

  const updateWatchlist = (movie, add) => {
    setWatchlist(prev => add ? [...prev, movie] : prev.filter(watch => watch.id !== movie.id));
  };

  const checkForEmptyMovie = () => {
    if (movieData.length > 0) {
      return (
        <>
          <MovieList
            data={movieData}
            updateFavorites={updateFavorites}
            updateWatchlist={updateWatchlist}
          />
          <footer>
            <button id="loadbtn" onClick={incrementPage}>Load More</button>
          </footer>
        </>
      );
    } else {
      return <p id="emptymessage">No movies match your search for "{apiData.search}", try searching for something else :D</p>
    }
  };

  return (
    <>
      <header>
        <h1>Flixster</h1>
        <Search searchQuery={apiData.search} setSearchQuery={handleSearch} />
        <Filter setFilters={handleFilter} />
        <Sort setSort={handleSort} />
        <p id="hamburger" onClick={toggleSide}>☰</p>
      </header>
      <div className={`App ${sideOpen ? 'open-side' : ''}`}>
        {checkForEmptyMovie()}
      </div>
      <Side
        isOpen={sideOpen}
        onClose={toggleSide}
        favorites={favorites}
        watchlist={watchlist}
      />
    </>
  );
}

export default App;
