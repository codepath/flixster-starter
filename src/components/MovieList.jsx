//import {useEffect, useState} from "react";
import MovieCards from "./MovieCards"
import "./movieCards.css"

function MovieList(props){
    

    function createCards(card, index){
        return(
            <MovieCards 
                key={index}
                title={card.title}
                img={"https://image.tmdb.org/t/p/w500"+card.poster_path}
                rating={card.vote_average}
            />
        )
    }

    return(
        <div className="movieList">
         {props.data.map(createCards)}     
        </div>
    )
}

export default MovieList;
