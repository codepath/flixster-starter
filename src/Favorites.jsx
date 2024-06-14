import './MovieCard.css'
import { useState } from 'react';


function Favorites({movies, watchList}) {
  // const [setFavorite, isSetFavorite] = useState({});
  const watchListMovies = movies.filter(movie => watchList[movie.id]);
  // const handleFavoriteButton = (event, movieId) => {
  //   event.stopmovieagation();
  //   isSetFavorite((prevfavorite) => ({...prevfavorite, [movieId]: !prevfavorite[movieId]}));
  // }
  {movies.map((movie, i) => {
    return (
      <>
        <div className='movieCards'>
          {watchListMovies.map((movie) => (
            <div className='movieCard' key={movie.id}>
              <img src={movie.poster_path}/>
              <p className='movieCard-title'>{movie.title}</p>
              <p>Rating: {movie.vote_average}</p>
            </div>
          ))}
           {/* <div>
              <img src={movie.poster_path}/>
              <p className='movieCard-title'>{movie.title}</p>
              <label onClick={(e) => handleFavoriteButton(e, movies.id)}>
                {setFavorite[movie.id]? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
              </label>
              <button className="watch-button" onClick={
                (e) => movie.handleWatchButton(e, movie.id)}> {movies.watchedMovies.includes(movie.id) ? "Watched✔️":"Add to Watchlist"}
              </button>
              <p>Rating: {movie.vote_average}</p>
            </div> */}
        </div>
      </>
    )
  })}

}

export default Favorites;
