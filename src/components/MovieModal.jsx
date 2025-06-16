import './MovieModal.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';




const MovieModal = ({ movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [noTrailer, setNoTrailer] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
        );
        const data = await res.json();

        const trailer = data.results.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setNoTrailer(true);
        }
      } catch (error) {
        console.error('Failed to fetch trailer:', error);
        setNoTrailer(true);
      }
    };

    fetchTrailer();
  }, [movie.id, apiKey]);



  if (!movie) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={backdropUrl} alt={movie.title} className="modal-backdrop" />
        <h2>{movie.title}</h2>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Runtime:</strong> {movie.runtime} min</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
        {trailerKey ? (
          <div className="trailer">
            <h3>🎬 Watch Trailer</h3>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : noTrailer ? (
          <p className="no-trailer">🚫 No trailer available for this movie.</p>
        ) : (
          <p>Loading trailer...</p>
        )}
        <button onClick={onClose} className="modal-close">Close</button>
      </div>
    </div>
  );
};

MovieModal.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    overview: PropTypes.string,
    runtime: PropTypes.number,
    release_date: PropTypes.string,
    backdrop_path: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    )
  }),
  onClose: PropTypes.func.isRequired
};


export default MovieModal;
