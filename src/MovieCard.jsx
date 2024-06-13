import Modal from "./Modal";
import { useState, useEffect} from "react";
import "./MovieCard.css"

const MovieCard = (props) => {
    function handleClick () {
        props.query(props.id);
        props.handleOpening()
    }

    return (
        <div class="card clear-fix" onClick={handleClick}>
            <div class="cards card-movie">
                <img src={props.url} class="img-responsive" alt="Cards Image"/>
                <span class="card-movie__rect"></span>
                <ul class="card-movie__list">
                <li>Rating: ⭐{props.rating}</li>
                </ul>
                <span class="card-movie__tri"></span>
                <p>{props.title}</p>
            </div>
          </div>
    )
}   
export default MovieCard;