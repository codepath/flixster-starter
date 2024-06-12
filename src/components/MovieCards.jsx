import "./movieCards.css"
import { useState } from "react";
import ModalContainer from "./ModalContainer";

function MovieCard (props) {
    const[isModalOpen, setModal]=useState(false)

    function openModal(){
        setModal(true)
    }
    function closeModal()
    {
        setModal(false)
    }
    return(
        <>
            <div className= "movie-card" >
                <img src={props.img} className="moviePoster" onClick={openModal}/>
                <h2 className="movieTitle">{props.title}</h2>
                <p className="movieRating">Rating: {props.rating} </p>
            </div>
            {isModalOpen ?  <ModalContainer data={props} close={closeModal}/>: null}
        </>
   

    );
}

export default MovieCard;