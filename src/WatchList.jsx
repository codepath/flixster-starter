import MovieCard from './MovieCard';
import './MovieCard.css'

function WatchList({movies, watchlist}) {
  // movies = [{adult: false, backdrop_path: '/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg', genre_ids: Array(2), id: 719221}
  // , {adult: false, backdrop_path: '/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg', genre_ids: Array(2), id: 719222}
  // , {adult: false, backdrop_path: '/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg', genre_ids: Array( 2), id: 719222}]
  // watchlist = [719221, 719223]
  const watchListMovies = movies.filter(movie => watchlist.includes(movie.id));
  console.log(watchListMovies);

  return (
    <>
      <h1>Watchlist</h1>
      <div>
        {watchListMovies.map((movie) => (
          <div key={movie.id}>
            <MovieCard  movie={movie} />
          </div>
        ))}
      </div>

    </>
  )
}

export default WatchList;
