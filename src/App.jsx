import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import NowPlaying from './NowPlaying';
import Searching from './Searching';
import Sidebar from './Sidebar';
import Footer from './Footer';

const App = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const toggleScreen = () => {
    setIsSearching(prevState => !prevState);
  };

  const handleSortChange = (criteria) => {
    console.log(criteria);
    setMovies([])
    setSortCriteria(criteria);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const handleSetFavorites = (newVal) => {
    setFavorites(newVal)
  }

  const handleSetWatched = (newVal) => {
    setWatched(newVal)
  }

  const loadNewPages = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWU5YTZiOThlMTBjZDkyZTcxN2Y4OWIzZDYxYjdjNSIsInN1YiI6IjY2NjY1MTQ1Y2M3MDc0ZDliNjFjMWM2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IDf1-04fWbMoc-zzed3BAcZLflL14UG-mdjcZobVjxA'
      }
    };

    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=${sortCriteria}`, options)
      .then(response => response.json())
      .then(response => setMovies(movies.concat(response.results)))
      .catch(err => console.error(err));
  }, [pageNumber, sortCriteria]);


  return (
    <div className="App">
      <Header setIsSearching={setIsSearching} sortMovies={handleSortChange} />
      <button onClick={toggleSidebar} className="sidebar-toggle">
        ☰
      </button>
      {isSidebarOpen && <Sidebar closeSideBar={toggleSidebar} favorites={favorites} watched={watched} />}
      <main>
        <button onClick={toggleScreen} className="toggle-button">
          {isSearching ? 'Now Playing' : 'Search'}
        </button>
        {isSearching ? (
          <Searching
            favorites={favorites}
            setFavorites={handleSetFavorites}
            watched={watched}
            setWatched={handleSetWatched}
          />
        ) : (
          <NowPlaying
            sortCriteria={sortCriteria}
            favorites={favorites}
            setFavorites={handleSetFavorites}
            watched={watched}
            setWatched={handleSetWatched}
            movies={movies}
            loadNewPages={loadNewPages}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
