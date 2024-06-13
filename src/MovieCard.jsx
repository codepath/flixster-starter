import { useState, useEffect } from 'react';
import Modal from './Modal';
import './MovieCard.css';
import './App.css';

const MovieCard = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [genres, setGenres] = useState([]);
    const [runtime, setRuntime] = useState('');
    const apiKey = import.meta.env.VITE_API_KEY;

    const toggleModal = () => {
        setIsClicked(!isClicked);
    }

    useEffect(() => {
        fetchMoreInfo(props.id);
      }, [isClicked])



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

    const className = Number(props.rating) < 5 ? 'bad' : Number(props.rating) < 7.5 ? 'okay' : 'good'
    return (
        <div>
            <div className="imageContainer" onClick={toggleModal} id={props.id} >
                <img src={props.image} id="movie-poster"/>
                <p id="movie-title">{props.title}</p>
                <p id="movie-rating" className={className}>{props.rating}</p>
            </div>
            <Modal  id={props.id} isClicked={isClicked} toggleModal={toggleModal} movieTitle={props.title} image={props.image} releaseDate={props.releaseDate} movieOverview={props.movieOverview} movieGenres={props.movieGenres} runtime={runtime} genres={genres}/>
        </div>
    )
}

export default MovieCard
