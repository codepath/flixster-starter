import { useState, useEffect } from 'react';
import Modal from './Modal';
import './MovieCard.css';
import './App.css';

const MovieCard = (props) => {
    const [isClicked, setIsClicked] = useState(false);

    const toggleModal = () => {
        setIsClicked(!isClicked);
    }

    const className = Number(props.rating) < 5 ? 'bad' : Number(props.rating) < 7.5 ? 'okay' : 'good'
    return (
        <div>
            <div className="imageContainer" onClick={toggleModal} >
                <img src={props.image} id="movie-poster"/>
                <p id="movie-title">{props.title}</p>
                <p id="movie-rating" className={className}>{props.rating}</p>
            </div>
            <Modal id={props.id} isClicked={isClicked} toggleModal={toggleModal} movieTitle={props.title} image={props.image} releaseDate={props.releaseDate} movieOverview={props.movieOverview} movieGenres={props.movieGenres}/>
        </div>
    )
}

export default MovieCard
