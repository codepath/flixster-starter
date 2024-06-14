import './App.css';
import MovieList from './MovieList';
import Search from './Search';
import Filter from './Filter';
import Sort from './Sort';
import { useState, useEffect } from 'react';

function App() {
  //a central state object map for all elements that interact with api requests allows us to ensure all fetch requests are in sync with all current relevant values
  const [apiReqData, setApiReqData] = useState({
    search: '',
    page: 1,
    filters: [],
    sort: ''
  });
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [apiReqData]);
//fetchData fetches data by inserting sort,search,and filter info onto the base API URL as needed and sets visible movies to correspond with API response
  const fetchData = async () => {
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&include_adult=false&include_video=false&page=${apiReqData.page}&api_key=${import.meta.env.VITE_API_KEY}`;

      if (apiReqData.search !== '') {
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(apiReqData.search)}&language=en-US&page=${apiReqData.page}&include_adult=false&api_key=${import.meta.env.VITE_API_KEY}`;
      }
      if (apiReqData.filters.length > 0) {
        url += `&with_genres=${apiReqData.filters.join(',')}`;
      }
      if (apiReqData.sort !== ''){
        url += `&sort_by=${apiReqData.sort}`
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies: ' + response.statusText);
      }
      const data = await response.json();
      // Update movieData by appending new results to existing data if not on the first page, otherwise replace existing data.
      setMovieData(prevData => apiReqData.page > 1 ? [...prevData, ...data.results] : [...data.results]);

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // All handlers work by updating the apiReqData state with new values for search, filters, sort, or page whenever relevant while maintaining unchanged fields
  const handleSearch = (query) => {
    setApiReqData({...apiReqData, search: query, page: 1});
  };

  const handleFilter = (newFilters) => {
    setApiReqData({...apiReqData, filters: newFilters, page: 1});
  };

  const handleSort = (newSort) => {
    setApiReqData({...apiReqData, sort: newSort, page: 1});
  };

  const incrementPage = () => {
    setApiReqData({...apiReqData, page: apiReqData.page + 1}); 
  };

  const checkForEmptyMovie = () => {
    if (movieData.length > 0) {
      return (
        <>
          <MovieList data={movieData} />
          <footer>
            <button id="loadbtn" onClick={incrementPage}>Load More</button>
          </footer>
        </>
      );
    } else {
      return <p id="emptymessage">No movies match your search for "{apiReqData.search}", try searching for something else :D</p>
    }
  };

  return (
    <>  
      <header>
        <h1>Flixster</h1>
        <Search searchQuery={apiReqData.search} setSearchQuery={handleSearch}/>
        <Filter setFilters={handleFilter}/>
        <Sort setSort={handleSort}/>
      </header>
      <div className="App">
        {checkForEmptyMovie()}
      </div>
    </>
  );
}

export default App;


