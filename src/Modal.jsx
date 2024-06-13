import './Modal.css';
import { useState, useEffect } from 'react';
import { format } from 'date-fns'

const Modal = (props) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [genres, setGenres] = useState([]);
    const [runtime, setRuntime] = useState('');
    const movieId = props.id;

    useEffect(() => {
        fetchMoreInfo();
      }, [props.toggleModal])

    const fetchMoreInfo = async () => {
        const url = `https://api.themoviedb.org/3/movie/${props.id}?language=en-US&api_key=0d7613c1b95dbc61f3dd491c8f802475`
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiKey}`,
            }
          };

          const response = await fetch(url, options);
          const jsonResponse = await response.json();
          setGenres(jsonResponse.genres);
          setRuntime(jsonResponse.runtime);

    }

    const posterImage = `https://image.tmdb.org/t/p/w500${props.image}`;
    const date = new Date(props.releaseDate);
    const formattedDate = format(date, 'MMMM d, yyyy');
    return (
        <div className='movie-modal' style={{ display: props.isClicked ? 'block' : 'none' }}>
            <div className='modal-content'>
                <div className='modal-image'>
                    <img src ={posterImage} id='modal-poster' />
                </div>
                <div className='modal-info'>
                    <p id="modal-title">{props.movieTitle}</p>
                    <p id='release-date'>Release Date: {formattedDate}</p>
                    <p id="runtime">Runtime: {runtime} minutes</p>
                    <p id='movie-overview'>{props.movieOverview}</p>
                    {/* <p id='movie-genre'>Genres: {genres}</p> */}
                </div>
                <span id='close-modal' onClick={props.toggleModal}>&times;</span>
            </div>
        </div>
    )
}

export default Modal;
