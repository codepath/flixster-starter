import './MovieCard.css'
import { useState } from 'react';


function WatchList({movies, watchList}) {
  // const [setFavorite, isSetFavorite] = useState({});
  const watchListMovies = movies.filter(movie => watchList.includes(movie.id));
  // const handleFavoriteButton = (event, movieId) => {
  //   event.stopmovieagation();
  //   isSetFavorite((prevfavorite) => ({...prevfavorite, [movieId]: !prevfavorite[movieId]}));
  // }
    return (
      <div className='movieCards'>
        <h1>Watchlist</h1>
        {watchListMovies.map((movie, i) => (
          <div className='movieCard' key={movie.id}>
            <img src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
            <p>hi</p>
            <p className='movieCard-title'>{movie.title}</p>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    )
}

export default WatchList;
