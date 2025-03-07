import { useState, useEffect} from 'react'
import './NowPlaying.css'
import Header from '/src/Header'
import MovieList from '/src/MovieList'
import SearchBar from './SearchBar'


const Searching = ({favorites, setFavorites, watched, setWatched}) => {
  const[movies, setMovies] =useState([]);
  const [pageNumber, setPageNumber]=useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2EzMjIyN2ViZDA2NDIxMmVhODU3NWI1ODI2NWEyNSIsInN1YiI6IjY2Njc2NGZkN2U0MTRkODIzM2I5Yzg1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NUYxsfy9MWnIfFGPrQ-wwi-OZ7nHi0Z8t1M0Dj62tl0'
    }
  };

  fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setMovies(response.results))
    // .then(response => setMovies(prevMovies =>prevMovies.concat(response.results)))
    .catch(err => console.error(err));
}, [searchQuery]);


    // fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`, options)
    //     .then(response => response.json())
    //     .then(response => setMovies(prevMovies =>prevMovies.concat(response.results)))
    //     .catch(err => console.error(err));
    // }, [pageNumber]);

  function loadNewPages(){
    setPageNumber(prevPageNumber => prevPageNumber+1)
  }


  return (
    <div className="now-playing">
        <SearchBar setSearchQuery={setSearchQuery} />
    <main>
      <MovieList data={movies}
                favorites={favorites}
                setFavorites={setFavorites}
                watched={watched}
                setWatched={setWatched}
      />

      {/* <button onClick={loadNewPages}>Load More</button> */}
    </main>


  </div>
    )

}


export default Searching;



























// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2EzMjIyN2ViZDA2NDIxMmVhODU3NWI1ODI2NWEyNSIsInN1YiI6IjY2Njc2NGZkN2U0MTRkODIzM2I5Yzg1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NUYxsfy9MWnIfFGPrQ-wwi-OZ7nHi0Z8t1M0Dj62tl0'
//     }
//   };

//   fetch(`https://api.themoviedb.org/3/search/movie?query=${searching}&include_adult=false&language=en-US&page=1`, options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
