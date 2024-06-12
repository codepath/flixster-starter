import {useEffect, useState} from "react";
import MovieList from "./MovieList";
import Header from "./Header"


function NowPlayingScreen({ criteriaFromHeader }){
  
    const [movies, setMovies]=useState([]);
    const [pageNumber, setPageNumber]=useState(1);
    const[url, setUrl]=useState(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`)


    const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

    useEffect(()=>{
      const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
          }
        };
        
        fetch(url, options)
          .then(response => response.json())
          .then(response => {
            handleSortMovies(criteriaFromHeader, movies.concat(response.results))
          })
          .catch(err => console.error(err));
      }, [url, pageNumber]);

      function loadMore(){
        setPageNumber(prevPageNumber => prevPageNumber+1)
        setUrl(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber + 1}`);
        //useEffect();
      }

      function handleSortMovies(criteria, parmaMovies = movies){

        const sortedMovies = [...parmaMovies].sort((a, b) => {

          if (criteria === 'title') {
            return a.title.localeCompare(b.title);
          } else if (criteria === 'date') {
            return new Date(a.release_date) - new Date(b.release_date);
          } else if (criteria === 'rating') {
            return b.vote_average - a.vote_average;
          }
          return 0;
        });
        setMovies(sortedMovies);
      }

      useEffect(function() {
        handleSortMovies(criteriaFromHeader)
      }, [criteriaFromHeader])

      return(
        <div>
            <MovieList data={movies} />
            <button onClick={loadMore}>Load more</button>
        </div>

      )

}

export default NowPlayingScreen;