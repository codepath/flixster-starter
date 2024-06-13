import "./App.css"
import Modal from "./Modal";
import { useState, useEffect} from "react";
// import "./MovieCard.css"

const MovieCard = (props) => {
    function handleClick () {
        props.query(props.id);
        props.handleOpening()
    }

    return (
        // <div class="card clear-fix">
        //     <div class="cards card-movie">
        //         <img src="https://m.media-amazon.com/images/M/MV5BOGFjYWNkMTMtMTg1ZC00Y2I4LTg0ZTYtN2ZlMzI4MGQwNzg4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" class="img-responsive" alt="Cards Image"/>
        //         <span class="card-movie__rect"></span>
        //         <ul class="card-movie__list">
        //         <li>Rating: 9.5 star</li>
        //         </ul>
        //         <span class="card-movie__tri"></span>
        //         <p>Godzilla King of the Monsters</p>
        //     </div>
        //   </div>
        
        <div className="card" onClick={handleClick}>
            <h3>{props.title}</h3>
            <img className="image" src={props.url}/>
            <p>⭐{props.rating}</p>
        </div>
    )
}
export default MovieCard;