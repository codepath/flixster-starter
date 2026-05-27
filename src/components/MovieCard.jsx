import { useEffect, useState } from "react";
import PopupModal from "./PopupModal";
import LikeButton from "./LikeButton";
import WatchedButton from "./WatchedButton";

const MovieCard = ({movies}) => {

  const [showModal, setShowModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState({})
  const [movieIdInfo, setMovieIdInfo] = useState({});
  const [movieVideoInfo, setMovieVideoInfo] = useState([]);
   
    useEffect(() => {
        if (selectedMovie.id) {
            fetchMovieData(selectedMovie.id)
            fetchVideoData(selectedMovie.id)
        };
    }, [selectedMovie]);

    const fetchMovieData = async (movieID) => {
        const idURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(idURL);
        const data = await response.json();
        const movieIdInfo = data;
        setMovieIdInfo(movieIdInfo)
    };

    const fetchVideoData = async (movieID) => {
        const videoIdURL = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(videoIdURL);
        const data = await response.json();
        const movieVideoInfo = data;
        setMovieVideoInfo(movieVideoInfo.results);
    };
    
    return (
        <div className="App-MovieCard">
            {movies.map((movie) => (
                <div key={movie.id} onClick={() => {
                        setShowModal(true)
                        setSelectedMovie(movie)
                    }} className="App-MovieContainer">
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p className='voteAverage'>⭐ {movie.vote_average}</p>
                        <div className='userButtons'>
                            <LikeButton handleLikeButton={(movieIdInfo) => handleLikeButton(movieIdInfo)} movieId={movie.id} />
                            <WatchedButton handleWatchedButton={(movieIdInfo) => handleWatchButton(movieIdInfo)} movieId={movie.id} />  
                        </div>
                    </div>
                </div>
            ))}
            <PopupModal
                setShowModal={setShowModal}
                selectedMovie={selectedMovie}
                showModal={showModal}
                movieIdInfo={movieIdInfo}
                movieVideoInfo={movieVideoInfo}
            />
        </div>
    );
};

export default MovieCard;