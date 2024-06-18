import React, { useState, useEffect } from 'react';
import MovieCard from "../MovieCard/MovieCard.jsx";
import "../MovieList/MovieList.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import { parseMovieData} from "../../utils/utils.js";

const MovieList = () =>{

    const[movieData, setMovieData] = useState([]);
    const [page, setPage] = useState(1);
    const[searchTerm, setSearchTerm] = useState("");
    const [activeView, setActiveView] = useState("nowPlaying");

    useEffect(() => {
        if (activeView === "nowPlaying") {
            fetchNowPlaying(page);
        } else {
            fetchData(page, searchTerm);
        }
    }, [page, searchTerm, activeView]);

    // const handleClick = () => {
    //     setPage(page + 1);
    //     fetchData()
    // }

    //Load Pages...
    const handleClick = () => {
        setPage(prevPage => prevPage + 1);
        };
    console.log(`Clicked ${page}`)

    const handleSearchTerm = (newSearch) => {
        setSearchTerm(newSearch);
        setPage(1);
        setActiveView("search");
      };

      const fetchNowPlaying = async (page) => {
        try {
            const apiKey = import.meta.env.VITE_APP_API_KEY;
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`);
            if (!response.ok) {
                throw new Error('Failed to fetch movie data');
            }
            const data = await response.json();
            if (page === 1) {
                setMovieData(data.results);
            } else {
                setMovieData(prevData => [...prevData, ...data.results]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async (page, searchTerm) => {
    try{
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        //Maybe without
        console.log('API Key:', apiKey);
        
        const url = searchTerm
                ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&page=${page}`
                : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error('Failed to fetch movie data');
            }
            const data = await response.json()
            if (page === 1) {
                setMovieData(data.results);
            } else {
                setMovieData(prevData => [...prevData, ...data.results]);
            }
            console.log(data);
            } 
        catch (error){
            console.error(error);
        }
    };


    const parsedData = parseMovieData(movieData);
    console.log(parsedData);

    const handleViewChange = (view) => {
        setActiveView(view);
        setPage(1);
        if (view === "nowPlaying") {
            setSearchTerm("");
        }
    };

     
    return(
        <>
        <header className="my-header">
            <h1 className="title">
                Flixster
            </h1>
            {/* ????? */}
            <div className="button-container">
                    <button onClick={() => handleViewChange("nowPlaying")} className={activeView === "nowPlaying" ? "active" : ""}>
                        Now Playing
                    </button>
                    <button onClick={() => handleViewChange("search")} className={activeView === "search" ? "active" : ""}>
                        Search
                    </button>
                </div>
                {activeView === "search" && <SearchForm onSearchChange={handleSearchTerm} />}
                <nav className="nav-bar"></nav>
            {/* <SearchForm onSearchChange={handleSearchTerm}/> */}
           
            <nav className="nav-bar">

            </nav>

        </header>
        <div className="movie-container">
            {parsedData.map(movie => (
                <div className="movie-card" key={movie.movieId}>
                    <MovieCard movieTitle={movie.movieTitle} posterImage={movie.posterImage} movieVoteAverage={movie.movieVoteAverage} />
                </div>
            ))}        
        </div>
        <button onClick={handleClick} className="load-button">Load More...</button>
        </>
    );
};

export default MovieList;