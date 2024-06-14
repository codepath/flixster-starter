import './MovieCard.css'
import { useState } from 'react';


function MovieCard(props) {
  // const [setFavorite, isSetFavorite] = useState({});
  // const handleFavoriteButton = (event, movieId) => {
  //   event.stopPropagation();
  //   isSetFavorite((prevfavorite) => ({...prevfavorite, [movieId]: !prevfavorite[movieId]}));
  // }
  return (
    <>
      <div className='movieCards'>
        <div>
          <img src={props.poster_path}/>
          <p className='movieCard-title'>{props.title}</p>
          <label onClick={(e) => props.handleFavoriteButton(e, props.id)}>
            {props.favoritedMoviesList.includes(props.id)? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
          </label>
          <button className="watch-button" onClick={
            (e) => props.handleWatchButton(e, props.id)}> {props.watchedMovies.includes(props.id) ? "Watched✔️":"Add to Watchlist"}
          </button>
          <p>Rating: {props.vote_average}</p>
        </div>
      </div>
    </>
  )
}

export default MovieCard;
