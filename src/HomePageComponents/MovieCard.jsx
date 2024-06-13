import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie, isFavorite, isWatched, onToggleFavorite, onToggleWatched }) => {
  return (
    <div className="MovieCard">
      <h3>{movie?.title}</h3>
      <img src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`} alt={movie?.title} />
      <div>
        <button onClick={onToggleFavorite} style={{ color: isFavorite ? 'red' : 'grey', border: 'none', background: 'transparent' }}>
          <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} size="lg" />
        </button>
        <label>
          <input type="checkbox" checked={isWatched} onChange={onToggleWatched} />
          Watched
        </label>
        <span>Rating: {movie?.vote_average} / 10</span>
      </div>
    </div>
  );
};

export default MovieCard;
