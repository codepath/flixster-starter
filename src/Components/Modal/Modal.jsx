import React from "react";
import './Modal.css'; 
import YouTube from "react-youtube";

const Modal = ({show, onClose, children, movieBackdrop, movieTitle, releaseDate, movieOverview, trailerUrl, genres}) => {

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
                    <a href={trailerUrl}  target="_blank" rel="noopener noreferrer" >
                        Watch Trailer
                    </a>
                    
                </div>
            </div>
        </div>
    );
};

export default Modal;