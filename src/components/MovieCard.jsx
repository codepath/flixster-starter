
import PropTypes from 'prop-types';
import '../App.css';
import closeEyeIcon from '/src/assets/close-eye-icon.jpg';
import eyeIcon from '/src/assets/eye-icon.jpg';



const MovieCard = ({ title, posterPath, voteAverage, isFavorite, onToggleFavorite,hasWatched,onToggleWatched }) => {
 
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;


  return (
    <div className="movie-card">
        <img src={imageUrl} alt="Movie Image" />
        <h3>{title}</h3>
        <p>Rating: {voteAverage}</p>
      <div className='card-icons'>
        <button
            className="favorite-button"
            onClick={(e) => {
                e.stopPropagation();  // prevents the modal from opening
                onToggleFavorite();   // handles the favorite toggle
            }}
            >
            {isFavorite ? '❤️' : '♡'}
        </button>
        <button
            className="eye-icon"
            onClick={(e) => {
                e.stopPropagation();  // prevents the modal from opening
                onToggleWatched();   // handles the watched toggle
            }}
            >
            {hasWatched ? <img src = {eyeIcon}/>: <img src = {closeEyeIcon}/>}
        </button>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  hasWatched: PropTypes.bool.isRequired,
  onToggleWatched: PropTypes.func.isRequired,


};


export default MovieCard;
