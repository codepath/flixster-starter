import "./movieCards.css"

function MovieCard (props) {
    return(
    <div className= "movie-card">
        <img src={props.img} className="moviePoster" />
        <h2 className="movieTitle">{props.title}</h2>
        <p className="movieRating">Rating: {props.rating} </p>
    </div>
    );
}

export default MovieCard;