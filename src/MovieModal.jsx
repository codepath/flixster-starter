import { useEffect, useState } from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movie) return;
      setLoading(true);

      const apiKey = import.meta.env.VITE_API_KEY;
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`;
      const videosUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`;

      try {
        // Fetch movie details
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();
        setMovieDetails(detailsData);

        // Fetch movie videos (trailers)
        const videosResponse = await fetch(videosUrl);
        const videosData = await videosResponse.json();

        // Filter for YouTube trailers
        const youtubeTrailers = videosData.results.filter(
          video => video.site === 'YouTube' &&
          (video.type === 'Trailer' || video.type === 'Teaser')
        );

        setTrailers(youtubeTrailers);

        // Set the first trailer as selected if available
        if (youtubeTrailers.length > 0) {
          setSelectedTrailer(youtubeTrailers[0]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (event.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  const handlePlayTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  if (!movie || !movieDetails || loading) return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-loading">Loading movie details...</div>
      </div>
    </div>
  );

  const movieModalComponent = () => {
    return (
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>

        <div
          className="modal-backdrop"
          style={{
            backgroundImage: movieDetails.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path})`
              : 'none'
          }}
        >
          <div className="modal-backdrop-overlay"></div>
        </div>

        <div className="modal-details">
          <h2 className="modal-title">{movieDetails.title}</h2>

          <div className="modal-info">
            <div className="modal-info-item">
              <span className="info-label">Release Date:</span>
              <span className="info-value">
                {new Date(movieDetails.release_date).toLocaleDateString()}
              </span>
            </div>

            <div className="modal-info-item">
              <span className="info-label">Runtime:</span>
              <span className="info-value">
                {movieDetails.runtime} minutes
              </span>
            </div>

            <div className="modal-info-item">
              <span className="info-label">Genres:</span>
              <span className="info-value">
                {movieDetails.genres.map(genre => genre.name).join(', ')}
              </span>
            </div>

            <div className="modal-info-item rating">
              <span className="info-label">Rating:</span>
              <span className="info-value">
                <span className="modal-vote">{movieDetails.vote_average.toFixed(1)}</span>
                <span className="modal-vote-count">({movieDetails.vote_count} votes)</span>
              </span>
            </div>
          </div>

          <div className="modal-overview">
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
          </div>

          {trailers.length > 0 && (
            <div className="modal-trailer">
              <h3>Trailer</h3>
              {showTrailer ? (
                <div className="trailer-player">
                  <button className="close-button" onClick={handleCloseTrailer}>×</button>
                  <iframe
                    className = "trailer-frame"
                    width="100%"
                    height="415"
                    src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=1`}
                    title={selectedTrailer.name}
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="trailer-thumbnail" onClick={handlePlayTrailer}>
                  <img
                    src={`https://img.youtube.com/vi/${selectedTrailer.key}/hqdefault.jpg`}
                    alt="Trailer thumbnail"
                  />
                  <div className="play-button">
                    <svg className="play-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="modal-overlay">
        {movieModalComponent()}

    </div>
  );
};

export default MovieModal;
