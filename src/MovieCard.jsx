import PropTypes from "prop-types"
import "./MovieCard.css"
import { useEffect, useState } from "react"
import { MovieModal } from "./MovieModal"
//handles everything with each movie card i.e the image, name, rating and clicking to show the modal.
function MovieCard({image, title, rating, onClick}){
    //use state for the modal of all cards i.e if it's opened or not
    const [openModal, setOpenModal] = useState(false)
    //creating the likey key
    const likesKey = `likes: ${title}`
    const likedKey = `liked: ${title}`
    const[likes, setLikes] = useState(0) //set number of likes to 0 by default 
    const[liked,setLiked] = useState(true) //sets liked to true by default
    useEffect(() => {
        const storedLikes = localStorage.getItem(likesKey) //stores number of likes in local storage for each movie so for example godzilla it'd be likes: godzilla
        const storedLiked = localStorage.getItem(likedKey) //stores if it was liked.
        if(storedLikes) setLikes(parseInt(storedLikes)) //passes number of likes into setLikes if it's changed
        if(storedLiked==='true') setLiked(true) // passes in the boolen into setLiked depending on if it had been liked.
    },[likedKey, likesKey]) //useEffect changes as they change
    function liker(){
        const newLiked = !liked
        console.log(newLiked)
        const newLikes = newLiked? likes-1:likes+1
        setLikes(newLikes)
        setLiked(newLiked)
        localStorage.setItem(likesKey,newLikes.toString())
        localStorage.setItem(likedKey,newLiked.toString())
    }

    const watchKey = `watches: ${title}`
    const watchedKey = `watched: ${title}`
    const[watch, setWatch] = useState(0)
    const[watched,setWatched] = useState(true)
    
    useEffect(() => {
        const storedWatch = localStorage.getItem(watchKey)
        const storedWatched = localStorage.getItem(watchedKey)
        if(storedWatch) setWatch(parseInt(storedWatch))
        if(storedWatched==='true') setWatched(true)
    },[watchedKey, watchKey])   

    function watcher(){
        const newWatched = !watched
        const newWatch = newWatched ? watch - 1: watch + 1
        setWatch(newWatch)
        setWatched(newWatched)

        localStorage.setItem(watchKey,newWatch.toString())
        localStorage.setItem(watchedKey,newWatched.toString())
    
   }
    const imgURL = `https://image.tmdb.org/t/p/w500/${image}`
    return(
        <div className="CardContent" onClick = {onClick}>
            <img className = "img" src={imgURL} alt={title}/>
            <div className="titleRating">
                <p className="title">{title}</p>
                <p>Rating: {rating}</p>
                <button onClick={(e) => {
                    liker()
                    e.stopPropagation()}}>{liked? '🤍 ':'❤️ '}<span>{likes}</span></button>
                <button onClick={(e) => {
                    watcher() 
                    e.stopPropagation()}}>{watched? '👁️ ': "😍"}<span>{watch}</span></button>
            </div>
            
        </div>
    )
}
MovieCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}
export default MovieCard