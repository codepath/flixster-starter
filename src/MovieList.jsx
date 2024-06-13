import { useEffect, useState } from "react";
import React from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

function MovieList(props) {



    function createCard(card) {

        return (
            <MovieCard
                getMovieInfo={props.getMovieInfo}
                setCurrentMovie={props.setCurrentMovie}
                key={card.id}
                title={card.title}
                img={"https://image.tmdb.org/t/p/w500" + card.poster_path}
                rating={card.vote_average}
                movie={card}
                movieId={card.id}
            />
        )
    }

    return (
        <div className="movie-list">
            {/* {props.data.map(createCard)} */}
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
                />
            )}
        </div>
    )
}

export default MovieList;
