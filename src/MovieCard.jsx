import Modal from "./Modal";
import { useState, useEffect} from "react";
import "./MovieCard.css"

const MovieCard = (props) => {
    function handleClick () {
        props.query(props.id);
        props.handleOpening()
    }

    return (
        <div className="card clear-fix" onClick={handleClick}>
            <div className="cards card-movie">
                <img src={props.url} className="img-responsive" alt="Cards Image"/>
                <span className="card-movie__rect"></span>
                <ul className="card-movie__list">
                <li>Rating: ⭐{props.rating}</li>
                </ul>
                <span className="card-movie__tri"></span>
                <p>{props.title}</p>
            </div>
          </div>
    )
}   
export default MovieCard;