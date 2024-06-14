import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css'
import Modal from './Modal';
const MovieList = () =>{
    const [count, setCount] = useState(1);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const[open, setOpen] = useState(false);
    const[sort, setSort] = useState("");
    const[genre, setGenre] = useState(1);
    let url;
    if(genre !== 1){
        url=`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${count}&with_genres=${genre}`
    } else if(sort !== ""){
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${count}&sort_by=${sort}`
    } else if (search === "") {
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${count}&sort_by=popularity.desc`;
    } else {
        url =`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`
    }
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
            if(count === 1){
                setMovies(response.results)
            } else{
                setMovies((movies)=>[...movies, ...response.results])
            }
        
        })}, [count, search, query, sort, genre]);

    function handleSubmit(e){
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        setSearch(formData.get("search"));
        setSort("");
        setGenre(1)
    }

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }
    function handleSort(e){
        e.preventDefault();
        if(e.target.value === "Revenue"){
            setSort("revenue.desc")
        } else if(e.target.value === "Popularity"){
            setSort("popularity.desc")
        } else if(e.target.value === "Primary Release Date"){
            setSort("primary_release_date.desc")
        } else if(e.target.value === "Vote Average"){
            setSort("vote_average.desc")
        }else if(e.target.value === "Vote Count"){
            setSort("vote_count.desc")
        } else {
            setSort("");
        }
        setSearch("");
        setGenre(1);
    }
    function handleFilter(e){
        e.preventDefault();
        if(e.target.value === "Action"){
            setGenre(28);
        } else if(e.target.value === "Comedy"){
            setGenre(35);
        } else if(e.target.value === "Thriller"){
            setGenre(53);
        } else if(e.target.value === "War"){
            setGenre(10752);
        }else if(e.target.value === "Romance"){
            setGenre(10749);
        }else {
            setGenre(1);
        }
    }
    function ResetSearch(e){
        e.preventDefault();
        setSearch("");
        setSort("");
        setGenre(1);
    }

    return(
        <>
        <header>
        <h2>🍿 Flixster 🎥</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor={search}>
            <input htmlFor={search} name="search"></input>
            </label>
            <button className='search' type="submit">Search</button>
        </form>
        <button onClick={ResetSearch} className='reset' type="submit">Reset</button>
        <select  className='dropdown' id="pet-select" onChange={handleSort}>
                <option value="">Sort</option>
                <option value="Revenue">Revenue</option>
                <option value="Popularity">Popularity</option>
                <option value="Vote Average">Vote Average</option>
                <option value="Vote Count">Vote Count</option>
                
        </select>
         <select  className='dropdown-right' onChange={handleFilter}>
                <option value="">Genre</option>
                <option value="Comedy">Comedy</option>
                <option value="Thriller">Popularity</option>
                <option value="War">War</option>
                <option value="Romance">Romance</option>  
        </select>
        </header>
        <div className='movie-container'>
                {open &&
                <Modal query={query} close={closeModal}/>}
                {movies.map(movie => (
                <MovieCard key={movie.id} id={movie.id} title={movie.original_title} url={movie.poster_path !== null ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : "https://cringemdb.com/img/movie-poster-placeholder.png"} 
                rating={movie.vote_average} query={setQuery} handleOpening={openModal} />
            ))}
        </div>
        {search === "" ? <button className='load' type="button" onClick={event = () =>{
            setCount(count=>count+1);
        }}>Load More+</button>: null}
        <footer>
            <p>© Copyright 2024. All Rights Reserved.</p>
        </footer>
        </>
    )


}
export default MovieList;