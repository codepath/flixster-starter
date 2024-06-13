import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.css";

function MovieCard(props) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

    function handleModal() {
        console.log("clicked");
        props.getMovieInfo(props.movieId);
    }

    const toggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(prevState => !prevState);
    };

    const toggleWatched = (e) => {
        e.stopPropagation();
        setIsWatched(prevState => !prevState);
    };

    return (
        <div className="movie-card" onClick={handleModal}>
            <img src={props.img} className="moviePoster" alt={props.title} />
            <h3 className="movie-title">{props.title}</h3>
            <p className="movie-rating">Rating: {props.rating}</p>
            <button className="favorite-button" onClick={toggleFavorite}>
                <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
            </button>
            <button className={`watched-button ${isWatched ? "watched" : ""}`} onClick={toggleWatched}>
                {isWatched ? "Watched" : "Mark as Watched"}
            </button>
        </div>
    );
}

export default MovieCard;
