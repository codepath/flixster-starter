import './MovieCard.css'
import './WatchList.css'

function Favorites({movies, favoriteList}) {
  const FavoritesMovies = movies.filter(movie => favoriteList.includes(movie.id));
    return (
      <div>
        <h1>Favorites</h1>
        <div className='movieList'>
          {FavoritesMovies.map((movie, i) => (
            <div className='movieCard' key={movie.id}>
              <img alt="Movie Poster iamge" src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
              <p className='movieCard-title'>{movie.title}</p>
              <p>Rating: {movie.vote_average}</p>
            </div>
          ))}
        </div>

      </div>
    )
}

export default Favorites;
