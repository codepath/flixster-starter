import { useState, useEffect } from "react";
import YoutubeEmbed from './YoutubeEmbed'

export default function MovieDetails({movie}) {

    const [movieDetails, setMovieDetails] = useState(null)
    const [videoId, setVideoId] = useState('')

    //API Information for call to movie details
    const url = `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`;
    const videoUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`
    const API_KEY = import.meta.env.VITE_API_KEY
    const options = {method: 'GET', headers: {accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`}}

    //Make API call for extra modal information
    useEffect(() => {
            const fetchMovieData =  async () => {
                if(movie.id === undefined){
                    return
                }

                try{
                    var res1 = await fetch(url, options)
                    var res2 = await fetch(videoUrl, options)
                    if(res1.ok && res2.ok){
                        const data = await res1.json();
                        const vidData = await res2.json()
                        setMovieDetails(data);
                        const video = vidData.results.find(video => video.type === "Trailer")
                        setVideoId(video.key)
                    }else{
                        throw new Error("API Not Responding")
                    }
                }catch(error){
                    console.error("Error: ", error.message)
                }
            }
            fetchMovieData();
        },[movie])


    //Path info for movie posters
    const imgURL = 'https://image.tmdb.org/t/p'
    const posterSize = '/w500'

    //Function to turn genre array into a string varible
    function genreString(genres) {
        let ret = ''
        for(var i = 0; i < genres.length; ++i){
            ret += (genres[i].name + ', ')
        }
        return ret.slice(0, -2)
    }

    if(movieDetails === null){
        return(<p>Loading...</p>)
    }

    return (
        <article>
            <h2 className="movieTitle">{movie.title}</h2>
            <img src={imgURL + posterSize + movie.backdrop_path} alt={movie.title + ' backdrop'} />
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Genres: </strong> {genreString(movieDetails.genres)}</p>
            <p><strong>Runtime: </strong> {movieDetails.runtime} minutes</p>
            <YoutubeEmbed embedId={videoId}/>

        </article>
    );
}