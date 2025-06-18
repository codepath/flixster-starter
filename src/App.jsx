import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'
import SearchForm from './SearchForm'
import SortForm from './SortForm'
import SideBar from './SideBar'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('nowPlaying'); // 'nowPlaying' or 'search'
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState('home');
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  // Load favorites and watched movies from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    const storedWatched = localStorage.getItem('watchedMovies');

    if (storedFavorites) {
      setFavoriteMovies(JSON.parse(storedFavorites));
    }

    if (storedWatched) {
      setWatchedMovies(JSON.parse(storedWatched));
    }
  }, []);

  // Save to localStorage whenever favorites or watched movies change
  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setView('search');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setView('nowPlaying');
  };

  const handleViewToggle = (selectedView) => {
    setView(selectedView);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Reset to nowPlaying view when changing pages
    if (page === 'home') {
      setView('nowPlaying');
    }
  };

  const toggleFavorite = (movie) => {
    setFavoriteMovies(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(favMovie => favMovie.id === movie.id);

      if (isAlreadyFavorite) {
        return prevFavorites.filter(favMovie => favMovie.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const toggleWatched = (movie) => {
    setWatchedMovies(prevWatched => {
      const isAlreadyWatched = prevWatched.some(watchedMovie => watchedMovie.id === movie.id);

      if (isAlreadyWatched) {
        return prevWatched.filter(watchedMovie => watchedMovie.id !== movie.id);
      } else {
        return [...prevWatched, movie];
      }
    });
  };

  const isMovieFavorite = (movieId) => {
    return favoriteMovies.some(movie => movie.id === movieId);
  };

  const isMovieWatched = (movieId) => {
    return watchedMovies.some(movie => movie.id === movieId);
  };

  return (
    <div className="App">
      <header className="header">
        <div class="title">
          <h1>Flixster</h1>
        </div>
        <banner className="App-header">
          {currentPage === 'home' && (
            <>
              <SearchForm onSearch={handleSearch} onClear={handleClearSearch} />
              <SortForm onSortChange={handleSortChange} />
            </>
          )}
        </banner>
      </header>

      <SideBar currentPage={currentPage} onPageChange={handlePageChange} />

      <main className="App-main">
        <MovieList
          searchQuery={searchQuery}
          view={view}
          sortBy={sortBy}
          onViewToggle={handleViewToggle}
          currentPage={currentPage}
          favoriteMovies={favoriteMovies}
          watchedMovies={watchedMovies}
          onToggleFavorite={toggleFavorite}
          onToggleWatched={toggleWatched}
          isMovieFavorite={isMovieFavorite}
          isMovieWatched={isMovieWatched}
        />
      </main>

      <footer className='App-footer'>
        <p>Copyright © 2025 Flixster</p>
      </footer>
    </div>
  )
}


export default App
