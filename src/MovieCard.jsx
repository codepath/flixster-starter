import './MovieCard.css';

const MovieCard = ({ image, title, rating }) => {
    const className = Number(rating) < 5 ? 'bad' : Number(rating) < 7.5 ? 'okay' : 'good'
    return (
        <div className="imageContainer">
            <img src={image} id="movie-poster"/>
            <p id="movie-title">{title}</p>
            <p id="movie-rating" className={className}>{rating}</p>
        </div>
    )
}

export default MovieCard
