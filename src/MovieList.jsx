import { useEffect, useState } from "react";
import React from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

function MovieList(props) {

    const toggleFavorite = (e, isAdd, movie) => {
        e.stopPropagation();
        if (isAdd) {
          props.setFavorites([...props.favorites, movie]);
        } else {
          props.setFavorites(props.favorites.filter(fav => fav.id !== movie.id));
        }
      };

      const toggleWatched = (e, isAdd, movie) => {
        e.stopPropagation();
        if (isAdd) {
          props.setWatched([...props.watched, movie]);
        } else {
          props.setWatched(props.watched.filter(watch => watch.id !== movie.id));
        }
      };

    return (
        <div className="movie-list">
            {props.data.map(card =>
                <MovieCard
                    getMovieInfo={props.getMovieInfo}
                    setCurrentMovie={props.setCurrentMovie}
                    key={card.id}
                    title={card.title}
                    img={"https://image.tmdb.org/t/p/w500" + card.poster_path}
                    rating={card.vote_average}
                    movie={card}
                    movieId={card.id}
                    isFavorite={props.favorites.includes(card)}
                    isWatched={props.watched.includes(card)}
                    toggleFavorite={toggleFavorite}
                    toggleWatched={toggleWatched}
                />
            )}
        </div>
    )
}

export default MovieList;
