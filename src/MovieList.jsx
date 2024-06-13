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
    console.log(url);
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
        console.log(formData.get("search"));
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
        console.log(e.target.textContent);
        if(e.target.textContent === "Revenue"){
            console.log("TESTING")
            setSort("revenue.desc")
        } else if(e.target.textContent === "Popularity"){
            setSort("popularity.desc")
        } else if(e.target.textContent === "Primary Release Date"){
            setSort("primary_release_date.desc")
        } else if(e.target.textContent === "Vote Average"){
            setSort("vote_average.desc")
        }else if(e.target.textContent === "Vote Count"){
            setSort("vote_count.desc")
        }
    }
    function handleFilter(e){
        e.preventDefault();
        console.log(e.target.textContent);
        if(e.target.textContent === "Action"){
            console.log("TESTING")
            setGenre(28);
        } else if(e.target.textContent === "Comedy"){
            setGenre(35);
        } else if(e.target.textContent === "Thriller"){
            setGenre(53);
        } else if(e.target.textContent === "War"){
            setGenre(10752);
        }else if(e.target.textContent === "Romance"){
            setGenre(10749);
        }
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
        <div className="dropdown" >
            <button className="dropbtn">Sort</button>
            <div className="dropdown-content">
                <p onClick={handleSort}>Revenue</p>
                <p onClick={handleSort}>Popularity</p>
                <p onClick={handleSort}>Vote Average</p>
                <p onClick={handleSort}>Vote Count</p>
            </div>
            <div></div>
        </div>
        <div className="dropdown-right" >
            <button className="dropbtn-right">Filter</button>
            <div className="dropdown-content-right">
                <p onClick={handleFilter}>Comedy</p>
                <p onClick={handleFilter}>Thriller</p>
                <p onClick={handleFilter}>War</p>
                <p onClick={handleFilter}>Romance</p>
            </div>
            <div></div>
        </div>
        </header>
        <div className='movie-container'>
                {open &&
                <Modal query={query} close={closeModal}/>}
                {movies.map(movie => (
                <MovieCard key={movie.id} id={movie.id} title={movie.original_title} url={"https://image.tmdb.org/t/p/w500" + movie.poster_path} rating={movie.vote_average} 
                query={setQuery} handleOpening={openModal} />
            ))}
        </div>
        {search === "" ? <button className='load' type="button" onClick={event = () =>{
            setCount(count=>count+1);
        }}>Load More+</button>: null}
        <footer>
            di0ojqwfiewj
        </footer>
        </>
    )


}
export default MovieList;