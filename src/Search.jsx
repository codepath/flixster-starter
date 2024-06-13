import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const Search = (props) => {
    const [movies, setMovies] = useState([]);
    let container = document.querySelector(".container")
    let set;
    let url = `https://api.themoviedb.org/3/search/movie?query=${props.name}&include_adult=false&language=en-US&page=1`;
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTI2OWIxMjIyYzJkNTliMDg0OGIwOTlkYWViN2Q5YiIsInN1YiI6IjY2Njc2NTkzNmI4ZGRiZDI3NGE5YmI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A_LcJj_8sed0Oiyee3M9o2ZgcHKGE_jdnCA4aoAx0iY'
            }
        };  
        fetch(url, options)
        .then(response => response.json())
        .then(response => {
            setMovies(response.results)

        })}, []);

    return(
        <>
        <div className='container'>
                {movies.map(movie => (
                <MovieCard key={movie.id} title={movie.original_title} url={"https://image.tmdb.org/t/p/w500" + movie.poster_path} rating={movie.vote_average}/>
            ))}
        </div>
        </>
    )

}
export default Search;
