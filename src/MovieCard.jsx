import "./MovieCard.css";
const MovieCard = ({ key, poster, title, rating, clickHandler }) => {
  return (
    //using info from MovieList to create element
    <div className="card" onClick={clickHandler}>
      <div className="img-container">
        <img src={poster} alt="Movie Poster" />
      </div>
      <div className="txt-container">
        <h2>{title}</h2>
        <p>{rating}</p>
      </div>
    </div>
  );
};
export default MovieCard;
