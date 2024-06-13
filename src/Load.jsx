import MovieCard from "./MovieCard";
import React, { useState, useEffect } from 'react';
import './App.css'


const Load = () => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(1);
    let container = document.querySelector(".container")
    console.log(container)


    let url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=' + count;
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
        .then(response => setData(response.results))
        }, [count]);
        console.log(data);
    return(
        <button type="button" onClick={event = () =>{
            setCount(count=>count+1);
            return(
                <>
                {data.map(movie => (
                    ReactDOM.render(<MovieCard key={movie.id} title={movie.original_title} url={"https://image.tmdb.org/t/p/w500" + movie.poster_path} rating={movie.vote_average}/>, container)
                ))}
                </>
            )
        }}>Load More+</button>
    )
}

export default Load;