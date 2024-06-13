import { useState, useEffect } from 'react';
import Modal from './Modal';
import './MovieCard.css';
import './App.css';

const MovieCard = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [genres, setGenres] = useState([]);
    const [runtime, setRuntime] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const apiKey = import.meta.env.VITE_API_KEY;

    const toggleModal = () => {
        setIsClicked(!isClicked);
    }

    useEffect(() => {
        fetchMoreInfo(props.id);
      }, [isClicked])

    const increaseLikes = () => {
        const heart = document.getElementById(props.id).querySelector('#like-count');
        setLikeCount(likeCount + 1);
        heart.innerText = `❤️ ${likeCount + 1}`;
    }


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

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const className = Number(props.rating) < 5 ? 'bad' : Number(props.rating) < 7.5 ? 'okay' : 'good'
    return (
        <div>
            <div className="imageContainer" id={props.id} >
                <img src={props.image} id="movie-poster" onClick={toggleModal}/>
                <p id="movie-title">{props.title}</p>
                <label id="check-box"><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />Watched</label>
                <p><span id="movie-rating" className={className}>{props.rating}</span><span id="like-count" onClick={increaseLikes}> ♡ {likeCount}</span></p>
            </div>
            <Modal  id={props.id} isClicked={isClicked} toggleModal={toggleModal} movieTitle={props.title} image={props.image} releaseDate={props.releaseDate} movieOverview={props.movieOverview} movieGenres={props.movieGenres} runtime={runtime} genres={genres}/>
        </div>
    )
}

export default MovieCard
