import { useState, useEffect } from 'react';
import Modal from './Modal';
import './MovieCard.css';
import './App.css';
import SideBar from './SideBar';

const MovieCard = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [genres, setGenres] = useState([]);
    const [runtime, setRuntime] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likedMovies, setLikedMovies] = useState([]);
    const [isWatched, setIsWatched] = useState(false);
    const [watchedMovies, setWatchedMovies] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        fetchMoreInfo(props.id);
      }, [isClicked])


    // useEffect(() => {
    //     addLikedMovie(props.title, props.image);
    // }, [isLiked])

    useEffect(() => {
        addWatchedMovie(props.title, props.image);
        console.log(props.watchedMovies);
    }, [isChecked])

    // useEffect(() => {
    //     onWatchedToggle(title, image, isChecked);
    // }, [isChecked, title, image, onWatchedToggle]);

    const toggleModal = () => {
        setIsClicked(!isClicked);
    }

    const toggleLike = () => {
        setIsLiked(!isLiked);
    }

    const toggleWatched = () => {
        setIsWatched(!isWatched);
    }

    // const addLikedMovie = (movieTitle, movieImage) => {
    //     const newLikedList = [...likedMovies, [movieTitle, movieImage]];
    //     setLikedMovies(newLikedList);
    //     // console.log(likedMovies);
    // }

    const addWatchedMovie = (movieTitle, movieImage) => {
        if (!isChecked) {
            const newWatchedList = [...watchedMovies, {title: movieTitle, image: movieImage}];
            setWatchedMovies(newWatchedList);
        }else {
            const newWatchedList = watchedMovies.filter(movie => movie.title !== movieTitle);
            setWatchedMovies(newWatchedList);
        }
        // console.log(isChecked);
        // console.log(watchedMovies);
    }


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

    function handleLike() {
        increaseLikes();
        toggleLike();
    }

    const className = Number(props.rating) < 5 ? 'bad' : Number(props.rating) < 7.5 ? 'okay' : 'good'
    return (
        <div>
            <div className="imageContainer" id={props.id} >
                <img src={props.image} id="movie-poster" onClick={toggleModal}/>
                <p id="movie-title">{props.title}</p>
                <label id="check-box"><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} onClick={toggleWatched}/>Watched</label>
                <p><span id="movie-rating" className={className}>{props.rating}</span><span id="like-count" onClick={handleLike}> ♡ {likeCount}</span></p>
            </div>
            <Modal  id={props.id} isClicked={isClicked} toggleModal={toggleModal} movieTitle={props.title} image={props.image} releaseDate={props.releaseDate} movieOverview={props.movieOverview} movieGenres={props.movieGenres} runtime={runtime} genres={genres}/>
            {/* <SideBar id={props.id} likedMovies={likedMovies} watchedMovies={watchedMovies}/> */}

        </div>
    )
}

export default MovieCard
