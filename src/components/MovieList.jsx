import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import Sidebar from './Sidebar';
import '../App.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState('nowPlaying');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('all');



  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (apiKey) {
      fetchMovies(1, mode);
    } else {
      console.error("API key is missing or invalid");
    }
  }, [mode]);

  const fetchMovies = async (pageNum = 1, currentMode = 'nowPlaying') => {
    try {
      const baseUrl = currentMode === 'search'
        ? `https://api.themoviedb.org/3/search/movie`
        : `https://api.themoviedb.org/3/movie/now_playing`;

      const queryParams = currentMode === 'search'
        ? `?query=${searchQuery}&page=${pageNum}&api_key=${apiKey}`
        : `?page=${pageNum}&api_key=${apiKey}`;

      const fullUrl = `${baseUrl}${queryParams}`;
      const res = await fetch(fullUrl);
      const data = await res.json();

      if (!data.results || data.results.length === 0 || pageNum >= data.total_pages) {
        setHasMore(false);
      }

      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, mode);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    setMode('search');
    fetchMovies(1, 'search');
  };

  const handleNowPlaying = () => {
    setSearchQuery('');
    setPage(1);
    setHasMore(true);
    setMode('nowPlaying');
    fetchMovies(1, 'nowPlaying');
  };

  const fetchMovieDetails = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    );
    const data = await res.json();
    setSelectedMovie(data);
  };

  const toggleFavorite = (movie) => {
  setFavorites((prevFavorites) => {
    const isAlreadyFavorited = prevFavorites.some((m) => m.id === movie.id);
    return isAlreadyFavorited
      ? prevFavorites.filter((m) => m.id !== movie.id)
      : [...prevFavorites, movie];
  });
};



  const toggleWatched = (movie) => {
    setWatched((prevWatched) => {
        const isAlreadyWatched = prevWatched.some((m) => m.id === movie.id);
        return isAlreadyWatched
        ? prevWatched.filter((m) => m.id !== movie.id)
        : [...prevWatched, movie];
    });
};


  const getSortedMovies = () => {

    let filteredMovies;

  if (viewMode === 'favorites') {
    filteredMovies = [...favorites];
  } else if (viewMode === 'watched') {
    filteredMovies = [...watched];
  } else {
    filteredMovies = [...movies];
  }

    if (sortOption === 'title') {
      filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'release') {
      filteredMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortOption === 'rating') {
      filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
    }

    return filteredMovies;
  };

  const clearSearchBtn = () => {
    setSearchQuery('');
    setMode('nowPlaying');
    return null;
  };

  // Homepage button in the side bar
   const homePage = () => {
    setSearchQuery('');
    setViewMode('all');  // Set view mode to 'all' to prevent home page and movie card layout breakage when nav bar is clicked
    setPage(1);
    setHasMore(true);
    fetchMovies(1, 'nowPlaying');
    setSidebarOpen(false);
  }




   return (
    <div className="layout-container">
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
        </button>
        {sidebarOpen && (
        
            <Sidebar
                mode={homePage}
                favorites={favorites}
                watched={watched}
                onSelectView={(mode) => {
                    setViewMode(mode);
                    setSidebarOpen(false); // close after click
                }}
            />
        
        )}


        <main>
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}

            <h1 id="Otter">🦦🍿</h1>
             
            <div className="controls">
                <button onClick={handleNowPlaying} disabled={mode === 'nowPlaying'}> Now Playing </button>
                <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                />
                <button onClick={handleSearch} disabled={!searchQuery.trim()}>Search</button>
                <button onClick={clearSearchBtn} disabled={!searchQuery.trim()}>Clear</button>

                <select className='sort-box'
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                >
                <option value="">Sort by</option>
                <option value="title">Title (A–Z)</option>
                <option value="release">Release Date (Newest)</option>
                <option value="rating">Rating (Highest)</option>
                </select>
            </div>

            <div className="movie-list">
                {getSortedMovies()
                .filter((movie) => movie.poster_path)
                .map((movie) => (
                    <div key={movie.id} onClick={() => fetchMovieDetails(movie.id)}>
                    <MovieCard
                        title={movie.title}
                        posterPath={movie.poster_path}
                        voteAverage={movie.vote_average}
                        isFavorite={favorites.some((fav) => fav.id === movie.id)}
                        onToggleFavorite={() => toggleFavorite(movie)}
                        hasWatched={watched.some((w) => w.id === movie.id)}
                        onToggleWatched={() => toggleWatched(movie)}
                    />

                    </div>
                ))}
            </div>

            {hasMore && (<button onClick={handleLoadMore} className="load-more">Load More</button>)} 
            {!hasMore && <p>No more movies to show.</p>}
            </main>
        

      
    </div>
  );
};

export default MovieList;
