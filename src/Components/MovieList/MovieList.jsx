import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from "../MovieCard/MovieCard.jsx";
import "../MovieList/MovieList.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Header from '../Header/Header.jsx';
import { parseMovieData} from "../../utils/utils.js";
import Modal from '../Modal/Modal.jsx';
import SortOptions from '../SortOptions/SortOptions.jsx';
import YouTube from "react-youtube";


const MovieList = () =>{

    const[movieData, setMovieData] = useState([]);
    const [page, setPage] = useState(1);
    const[searchTerm, setSearchTerm] = useState("");
    const [activeView, setActiveView] = useState("nowPlaying");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const[sortOption, setSortOption] = useState("releaseDate");

    useEffect(() => {
        if (activeView === "nowPlaying") {
            fetchNowPlaying(page);
        } else {
            fetchData(page, searchTerm);
        }
        
    }, [page, searchTerm, activeView], sortOption);

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

    const sortedData = useMemo(() => {
        const sorted = [...movieData];
        switch (sortOption) {
            case 'alphabetic':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'releaseDate':
                sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                break;
            case 'rating':
                sorted.sort((a, b) => b.vote_average - a.vote_average);
                break;
            default:
                break;
        }
        return sorted;
    }, [movieData, sortOption]);

    const parsedData = parseMovieData(sortedData);
    console.log(parsedData);

    const handleViewChange = (view) => {
        setActiveView(view);
        setPage(1);
        if (view === "nowPlaying") {
            setSearchTerm("");
        }
    };

    const handleSortChange = (event) => {
        const sort = event.target.value;
        console.log('Selected sort option:', sort)
        setSortOption(sort);
        setPage(1);
    }

     
    return(
        <>
        <Header handleViewChange={handleViewChange} activeView={activeView} handleSearchTerm={handleSearchTerm}  />
        <div className="body-container">
            
            <div className="button-container">
                <button onClick={() => handleViewChange("nowPlaying")} className="now-playing-button">Now Playing</button>
                <button onClick={() => handleViewChange("search")} className="search-button">Search</button>
                <SortOptions sortOption={sortOption} handleSortChange={handleSortChange}/>
            </div>
            {activeView === "search" && <SearchForm onSearchChange={handleSearchTerm} />}
            <div className="movie-container">
            {parsedData.map(movie => (
                <div className="movie-card" key={movie.movieId}>
                    <MovieCard movieTitle={movie.movieTitle} posterImage={movie.posterImage} movieVoteAverage={movie.movieVoteAverage} onClick={() => setSelectedMovie(movie) } 
                        />
                        
                </div>
            ))}     
            <button onClick={handleClick} className="load-button">Load More...</button>   
        </div>
        </div>
        {/* load pages */}



        {selectedMovie && (
            <Modal show={selectedMovie != null}
            onClose={() => setSelectedMovie(null)}
            movieTitle={selectedMovie.movieTitle}
            movieBackdrop={selectedMovie.movieBackdrop}
            releaseDate={selectedMovie.releaseDate}
            movieOverview={selectedMovie.movieOverview}
            trailerUrl={selectedMovie.trailerUrl}
            genres={selectedMovie.genres}/>
        )}
        
        <footer>
        <div className="footer-links">
            {/* <a href="https://www.linkedin.com/in/kiahna-isadore/">Contact</a> */}
            <a className="footer-class" href="https://github.com/Kisadore">Contact</a>
         
        </div >
        &copy; @ 2024 Kiahna Isadore 
        </footer>
        </>
    );
};

export default MovieList;