import './MovieList.css'
import MovieCard from './MovieCard'
import { useState } from 'react'
import { useEffect } from 'react'
import SearchBar from './SearchBar'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const fetchMovies = async() => {
    setLoading(true);
    try{
      const apiKey = import.meta.env.VITE_APP_API_KEY
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&api_key=9fc2582941573c4b168e5c4155a13688`);
      const data = await response.json();
      setMovies(prevMovies => [...prevMovies, ...data.results]);
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  }


  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <>
      <div>
        <h1>Movies Library</h1>
        <div className='movieList'>
          {movies.map((movie) => {
            return(
            <>
              <div className='movie-cards'>
                <MovieCard
                poster_path = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title = {movie.title}
                vote_average = {movie.vote_average} />
              </div>

            </>)
          })}
        </div>
        <button onClick={loadMoreMovies} disabled={loading}>Load More</button>
      </div>
    </>
  )
}

export default MovieList;
