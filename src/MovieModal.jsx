import { useEffect, useState } from "react"
import "./MovieModal.css"
import PropTypes from "prop-types"
import { use } from "react"
export function MovieModal({closeModal,keyId,title,image,release_date,overview}){
    const[runtime, setRuntime] = useState(null)
    const[genres, setGenres] = useState([])
    const [trailerKey, setTrailerKey] = useState('')
    const url = `https://api.themoviedb.org/3/movie/${keyId}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGM4OGY3ZWI4ZDU2YThkNWYzYjY3MzI4ZjU2YTM2ZSIsIm5iZiI6MTc0OTUzMzI3OC4yMjcsInN1YiI6IjY4NDdjMjVlZWM3MzI5M2NkN2JiMzZhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uhoqn3XL1sDXT-jJhsIbVMI2gzkhF5hzYOgdF9M8zA0'
  }
};
useEffect(() => {
    if(!keyId) return;
    fetch(url, options)
    .then(res => res.json())
    .then(data => {
    setRuntime(data.runtime)
    setGenres(data.genres || [])
  })
  .catch(err => console.error(err))

},[keyId])
function runtimeInHours(minutes){
    if(!minutes) return;
    return `${Math.floor(minutes/60)}h ${minutes%60}m`
}
async function fetchMovies(keyId){
    setTrailerKey(null)
    try{
         const apiKey = import.meta.env.VITE_APP_API_KEY
         const response = await fetch(`https://api.themoviedb.org/3/movie/${keyId}/videos?api_key=${apiKey}&language=en-us`,options)
         if(!response.ok){
          throw new Error("Can't load movies")
         }
         const data = await response.json()
         const  trailer = data.results.find(
            video => video.site === "YouTube" && 
            (video.type === 'Trailer') || video.type === "Teaser")
            if(trailer){
                setTrailerKey(trailer.key)
            }
      }  catch(error){
          console.log(error)
      }
}
useEffect(() => {
    if(keyId){
        fetchMovies(keyId)
    }
},[keyId])

    return(
        <div className="ModalBackground">
            <div className="ModalContent">    
                <h1>{title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500/${image}`} alt={title} />
                <p>Release Date: {release_date}</p>
                <p>Runtime: {runtimeInHours(runtime)}</p>
                <p>Genre: {genres.map((genre) => genre.name).join(", ")}</p> 
                <p>Overview: {overview}</p>
                {trailerKey && (
                    <div className="trailer"> 
                          <iframe 
                          width="550"
                          height="300"
                          src={`https://www.youtube.com/embed/${trailerKey}`} frameborder="0"
                          title="YouTube trailer player"
                          allow = "accelerometer; autoplay; clipboard-write; encrypted media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          >
                          </iframe>
                    </div>)}
                <button className = "closeBtn" onClick = {() => closeModal(false)} id="closeModal">CLOSE</button>
            </div>
        </div>
    )
}
