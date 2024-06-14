import './MovieCard.css'
import './WatchList.css'

function WatchList({movies, watchList}) {
  const watchListMovies = movies.filter(movie => watchList.includes(movie.id));
    return (
      <div>
        <h1>Watchlist</h1>
        <div className='movieList'>
          {watchListMovies.map((movie, i) => (
            <div className='movieCard' key={movie.id}>
              <img alt="Movie Poster path" src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
              <p className='movieCard-title'>{movie.title}</p>
              <p>Rating: {movie.vote_average}</p>
            </div>
          ))}
        </div>

      </div>
    )
}

export default WatchList;
