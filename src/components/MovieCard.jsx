import MovieButtons from './MovieButtons';
import '../styles/MovieCard.css'

const imgURL = 'https://image.tmdb.org/t/p'
const posterSize = '/w500'

export default function MovieCard({loadModal, addToFavs, addToWatched, movie}) {

    return (
        <article className="MovieCard" onClick={loadModal}>
            <img src={imgURL + posterSize + movie.poster_path} alt={movie.title + " poster"} />
            <h3><strong>{movie.title}</strong></h3>
            <p>Rating: {movie.vote_average}</p>
            <MovieButtons addToFav={addToFavs} addToWatched={addToWatched} movie={movie}/>
        </article>
    );
}