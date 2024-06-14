import './Modal.css';
import React, { useEffect, useState } from 'react';
import MovieCard  from './MovieCard';
function Modal(props){
    const [getTrailerKey, setGetTrailerKey] = useState("");
    const apiKey = import.meta.env.VITE_API_KEY;


    //use effect to get the trailer data from the API and find the trailers and their keys
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmRmODZiNWE1YmZkNTNmOGVmZWZhN2NkY2I1MGZhOSIsInN1YiI6IjY2Njg4NzllNmU0MTZkMDlhODhiNzYzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h4y2UevgrG927Du8ysa-yc4y9k7D3Yh7zDK2TU8eYEE'
            }
          };
          fetch(`https://api.themoviedb.org/3/movie/${props.data.movieID}/videos?api_key=${apiKey}`, options)
            .then(response => response.json())
            .then(response => response.results.find(
                (movie)=>movie.site === "YouTube" && movie.type === "Trailer"
                ))
                .then((movie) => setGetTrailerKey(`https://www.youtube.com/embed/${movie.key}?autoplay=1`))
            .catch(err => console.error(err));
    },[props.data.movieID, apiKey]);

    const Genres = {
        28:"Action",
        12:"Adventure",
        16:"Animation",
        35:"Comedy",
        80:"Crime",
        99:"Documentary",
        18:"Drama",
        10751:"Family",
        14:"Fantasy",
        36:"History",
        27:"Horror",
        10402:"Music",
        9648:"Mystery",
        10749:"Romance",
        878:"Science Fiction",
        10770:"TV Movie",
        53:"Thriller",
        10752:"War",
        37:"Western",
    }
    function getGenres(genres){
        return genres.map((genre)=> Genres[genre]).join(", ");
    }

    return(
        <section>
            <div className="modalOverlay">
                <div className="modalContainer" style={{background:'url(" ' + props.data.backdropImage + '")'}}>
                <div className='title-of-modal'>Title: {props.data.title}</div>
                    <button className="closeButton" onClick={props.close}>&times;</button>
                    <div className='modalContent'>
                        <div>
                            <div className='image-video'>
                                <img src={props.data.img} className='main-image'/>
                                <iframe
                                src={getTrailerKey}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                className='youtube'></iframe>
                            </div>
                            <div className='modal-Information'>

                                <div className='over-view'>{props.data.overview}</div>
                                <div>Original Title: {props.data.originalTitle}</div>
                                <div>Genres: {getGenres(props.data.genres)}</div>
                                <div>Release Date: {props.data.releaseDate}</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}
export default Modal;
