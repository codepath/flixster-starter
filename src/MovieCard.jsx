import './MovieCard.css';

const MovieCard = ({
  movie,
  onClick,
  onToggleFavorite,
  onToggleWatched,
  isFavorite,
  isWatched
}) => {
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  const handleClick = () => {
    onClick(movie);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(movie);
  };

  const handleWatchedClick = (e) => {
    e.stopPropagation();
    onToggleWatched(movie);
  };

  return (
    <div className="movie-card">
      <div className="movie-card-actions">
      <button
        className={`action-button favorite-button ${isFavorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "#fa5252" : "none"} stroke={isFavorite ? "#fa5252" : "white"} viewBox="0 0 24 24" width="20" height="20">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 6.42 3.42 5 5.5 5c1.74 0 3.41 1.01 4.13 2.44
                C10.09 6.01 11.76 5 13.5 5
                15.58 5 17 6.42 17 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
        </svg>
</button>

<button
  className={`action-button watched-button ${isWatched ? 'active' : ''}`}
  onClick={handleWatchedClick}
  aria-label={isWatched ? "Remove from watched" : "Mark as watched"}
  title={isWatched ? "Remove from watched" : "Mark as watched"}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={isWatched ? "#40c057" : "none"}
    stroke={isWatched ? "#40c057" : "white"}
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12s-4.5 7.5-10.5 7.5S1.5 12 1.5 12z"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
</button>

      </div>

      <div className="movie-card-content" onClick={handleClick}>
        <img
          src={movie.poster_path ? `${posterBaseUrl}${movie.poster_path}` : '/placeholder-poster.svg'}
          alt={`${movie.title} poster`}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-vote">
            <span className="vote-average">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
