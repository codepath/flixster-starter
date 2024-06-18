import React from "react";
import "../MovieCard/MovieCard.css";


const MovieCard = ({movieTitle, posterImage, movieVoteAverage, onClick}) =>{

    return(
        <div className="card" onClick={onClick}>
            <img className="posterImage" src={posterImage} alt={`${movieTitle} poster`} />
            <h3 className="movieTitle">{movieTitle}</h3>
            <p className="movieVoteAverage">Rating: {movieVoteAverage}</p>
        </div>
    );
};

export default MovieCard;