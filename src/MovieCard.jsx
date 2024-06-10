import './MovieCard.css'

function MovieCard(movie) {
    return (
        <div className='card'>
                <img src={movie.imgSrc}/>
                <p>{movie.title}</p>
                <p>{movie.rating}</p>
        </div>
    )
}

export default MovieCard;