// import './MovieCard.css'
// import { useState } from 'react';


// function Favorites({movies, Favorites}) {
//   // const [setFavorite, isSetFavorite] = useState({});
//   const FavoritesMovies = movies.filter(movie => Favorites[movie.id]);
//   // const handleFavoriteButton = (event, movieId) => {
//   //   event.stopmovieagation();
//   //   isSetFavorite((prevfavorite) => ({...prevfavorite, [movieId]: !prevfavorite[movieId]}));
//   // }
//   {movies.map((movie, i) => {
//     return (
//       <>
//         <div className='movieCards'>
//           {FavoritesMovies.map((movie) => (
//             <div className='movieCard' key={movie.id}>
//               <img src={movie.poster_path}/>
//               <p className='movieCard-title'>{movie.title}</p>
//               <p>Rating: {movie.vote_average}</p>
//             </div>
//           ))}
//            {/* <div>
//               <img src={movie.poster_path}/>
//               <p className='movieCard-title'>{movie.title}</p>
//               <label onClick={(e) => handleFavoriteButton(e, movies.id)}>
//                 {setFavorite[movie.id]? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
//               </label>
//               <button className="watch-button" onClick={
//                 (e) => movie.handleWatchButton(e, movie.id)}> {movies.watchedMovies.includes(movie.id) ? "Watched✔️":"Add to Favorites"}
//               </button>
//               <p>Rating: {movie.vote_average}</p>
//             </div> */}
//         </div>
//       </>
//     )
//   })}

// }

// export default Favorites;

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
              <img src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
              <p className='movieCard-title'>{movie.title}</p>
              <p>Rating: {movie.vote_average}</p>
            </div>
          ))}
        </div>

      </div>
    )
}

export default Favorites;
