import './MovieCard.css'
import { useState } from 'react';


function MovieCard(props) {
  const [watch, setWatch] = useState(false);
  const [setFavorite, isSetFavorite] = useState(false);

  const handleWatchButton = (event) => {
    event.stopPropagation();
    setWatch(!watch);
    //add particular movie id to watch list
  }

  const handleFavoriteButton = (event) => {
    event.stopPropagation();
    isSetFavorite(!setFavorite);
    //add particular movie id to favorite list
  }
  return (
    <>
      <div className='movieCards'>
        <div>
          <img src={props.poster_path}/>
          <p className='movieCard-title'>{props.title}</p>
          <label onClick={handleFavoriteButton}>
            {setFavorite? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
          </label>
          <button className="watch-button" onClick={handleWatchButton}> {watch? "Watched✔️":"Add to Watchlist"}</button>
          <p>Rating: {props.vote_average}</p>
        </div>
      </div>
    </>
  )
}

export default MovieCard;
