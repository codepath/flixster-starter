import './MovieList.css'
import MovieCard from './MovieCard'
import Modal from './Modal'
import { useState } from 'react'
import { useEffect } from 'react'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setsearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortOrder, setSortOrder] = useState('none');


  const fetchMovies = async() => {
    setLoading(true);
    try{
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&api_key=9fc2582941573c4b168e5c4155a13688`);
      const data = await response.json();
      setMovies(prevMovies => [...prevMovies, ...data.results]);
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  }

  //function to add more movies to the list
  const handleLoadMoreMovies = () => {
    if(isSearching) {
      const loadMoreMovies = async() => {
        setLoading(true);
        try{
          const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&api_key=9fc2582941573c4b168e5c4155a13688`);
          const data = await response.json();
          setMovies(prevMovies => [...prevMovies, ...data.results]);
          setPage((prevPage) => prevPage + 1);
        } catch(err) {
          console.error(err);
        }
        setLoading(false);
      }
      loadMoreMovies();
    } else{
      setPage((prevPage) => prevPage + 1);
    }
  }

  const handleSearch = async () => {
    if (searchQuery.trim() === ''){
      handleResetSearch();
    }
    setLoading(true);
    setIsSearching(true);
    try{
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${page}&query=${searchQuery}&api_key=9fc2582941573c4b168e5c4155a13688`);
      const data = await response.json();
      setMovies(data.results);
      setPage(1);
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  }
  const handleResetSearch = () => {
    setsearchQuery('');
    setIsSearching(false);
    setMovies([]);
    fetchMovies();
    setPage(1);
  }

  //function to open the modal
  const handleMovieCardClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const sortMovies = () => {
    const sortedMovies = [...movies].sort((a, b) => {
      if(sortOrder === 'none') {
        fetchMovies();
      } else if(sortOrder === 'ascending') {
        return a.title.localeCompare(b.title);
      } else if (sortOrder === 'descending') {
        return b.title.localeCompare(a.title);
      }
    });
    setMovies(sortedMovies);
  }
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  }

  const nowPlaying = (event) => {
    if (event.target.id === 'now-playing') {
      //TO-DO: add a function to hide input bar
      handleResetSearch()
    }
    else if (event.target.id === 'search'){
      handleSearch()
    }

  }

  useEffect(() => {
    if(!isSearching) {
      fetchMovies();
    }
  }, [page, isSearching]);

  //to reset search when there is no input
  useEffect(() => {
    if(searchQuery.trim()=== '') {
      handleResetSearch();
    }
  }, [searchQuery]);

  useEffect(() => {
    sortMovies();
  }, [sortOrder]);

  return (
    <>
      <div>
        {/* header section */}
        <h1>Flixster</h1>
        <div className='header'>
          {/* search section */}
          <div>
            <input
            type="text" value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value.toLowerCase())}
            placeholder="Search for movies"
            />
            <button id="search" className="search-button" type="submit" onClick={nowPlaying}>Search</button>
            <button id="now-playing" className='now-playing' type="submit" onClick={nowPlaying}>Now Playing</button>
          </div>

          {/* Sort section */}
          <div>
            <label>Sort by:</label>
            <select id ="sortOrder" value={sortOrder} onChange={handleSortChange}>
              <option value="none"> None</option>
              <option value="ascending">Sort movie title A-Z</option>
              <option value="descending">Sort movie title Z-A</option>
            </select>
          </div>
        </div>

        {/* movie list section */}
        <div className='movieList'>
          {movies.map((movie, i) => {
            return(
              <div key={i} className='movie-cards' onClick={() => handleMovieCardClick(movie)}>
                <MovieCard
                poster_path = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title = {movie.title}
                vote_average = {movie.vote_average}/>
              </div>
            )
          })}
        </div>
        {loading ? <p>Loading...</p> : <button onClick={handleLoadMoreMovies}>Load More</button>}
        {isModalOpen && selectedMovie &&  (
            <Modal movie={selectedMovie} setOpenModal={closeModal} />
        )}
      </div>
    </>
  )
}

export default MovieList;
