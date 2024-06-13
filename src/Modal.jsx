import './Modal.css';
import { useState, useEffect } from 'react';
import { format } from 'date-fns'

const Modal = (props) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [genres, setGenres] = useState([]);
    const movieId = props.id;

    const posterImage = `https://image.tmdb.org/t/p/w500${props.image}`;
    const date = new Date(props.releaseDate);
    const formattedDate = format(date, 'MMMM d, yyyy');
    const genreNames = props.genres.map(genre => genre.name);
    const genreNamesString = genreNames.join(', ');
    console.log(genreNames);
    return (
        <div className='movie-modal' style={{ display: props.isClicked ? 'block' : 'none' }}>
            <div className='modal-content'>
                <div className='modal-image'>
                    <img src ={posterImage} id='modal-poster' />
                </div>
                <div className='modal-info'>
                    <p id="modal-title">{props.movieTitle}</p>
                    <p id='release-date'>Release Date: {formattedDate}</p>
                    <p id="runtime">Runtime: {props.runtime} minutes</p>
                    <p id='movie-overview'>{props.movieOverview}</p>
                    <p id='movie-genre'>Genres: {genreNamesString}</p>
                </div>
                <span id='close-modal' onClick={props.toggleModal}>&times;</span>
            </div>
        </div>
    )
}

export default Modal;
