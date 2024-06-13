import "./MovieCard.css";

const MovieCard = ({
  movieId,
  title,
  poster,
  rating,
  clickHandler,
  seen,
  loved,
  toggleSeen,
  toggleLoved,
}) => {
  const handleToggleSeen = (e) => {
    e.stopPropagation();
    toggleSeen(movieId);
  };

  const handleToggleLoved = (e) => {
    e.stopPropagation();
    toggleLoved(movieId);
  };

  return (
    <div className="card" onClick={() => clickHandler(movieId)}>
      <div className="img-container">
        <img src={poster} alt="Movie Poster" />
      </div>
      <div className="txt-container">
        <h2>{title}</h2>
        <div className="sub-txt">
          <div className="icons">
            <p onClick={handleToggleLoved}>{loved ? "❤️" : "🤍"} </p>
            <p onClick={handleToggleSeen}>{seen ? "📖" : "📘"}</p>
          </div>
          <p className="rating">{rating}⭐️</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
