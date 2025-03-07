import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.css";

function MovieCard(props) {

  function handleModal() {
    props.getMovieInfo(props.movieId);
  }

  return (
    <div className="movie-card" onClick={handleModal}>
      <img src={props.img} className="moviePoster" alt={props.title} />
      <h3 className="movie-title">{props.title}</h3>
      <p className="movie-rating">Rating: {props.rating}</p>
      <button className="favorite-button" onClick={(e) => props.toggleFavorite(e, !props.isFavorite, props.movie)}>
        <FontAwesomeIcon icon={props.isFavorite ? solidHeart : regularHeart} />
      </button>
      <button className={`watched-button ${props.isWatched ? "watched" : ""}`} onClick={(e) => props.toggleWatched(e, !props.isWatched, props.movie)}>
        {props.isWatched ? "Watched" : "Mark as Watched"}
      </button>
    </div>
  );
}

export default MovieCard;
