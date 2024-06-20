import React, { useEffect, useState } from "react";
import './Modal.css'; 
import YouTube from "react-youtube";

const Modal = ({show, onClose, children, movieBackdrop, movieTitle, releaseDate, movieOverview, movieId, genres}) => {

    const [trailerKey, setTrailerKey] = useState(null);
    useEffect(() => {
        if (movieId) {
            const fetchTrailer = async () => {
                const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${import.meta.env.VITE_APP_API_KEY}`;
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    const trailer = data.results.find(video => video.type === "Trailer");
                    if (trailer) {
                        setTrailerKey(trailer.key);
                    }
                } catch (err) {
                    console.error("Failed to fetch trailer data:", err);
                }
            };
            fetchTrailer();
        }
    }, [movieId]);

    if(!show){
        return null;
    }

    
    return(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="modal-body">{children}
                    <h2 className="modalMovieTitle">{movieTitle}</h2>
                    <p className="modalGenres"><strong>Genres:</strong>  <span className="release-date">{genres}</span></p>
                    <img className="modalposterImage" src={movieBackdrop} alt={`${movieTitle} poster`} />
                    <h3 className="releaseTitle">Release Date: <span className="release-date">{releaseDate}</span></h3>
                    <p className="modalOverview"><strong>Overview:</strong>  <span className="release-date">{movieOverview}</span></p>
                    {/* <a href={trailerUrl}  target="_blank" rel="noopener noreferrer" >
                        Watch Trailer
                    </a> */}
                    {trailerKey ? (
                        <div className="video-container">
                            <YouTube videoId={trailerKey} opts={{ width: '100%', height: '100%' }} />
                        </div>
                    ) : (
                        <p>Trailer not available</p>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default Modal;