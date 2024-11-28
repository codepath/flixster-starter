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
    }, [page, searchTerm, activeView]);

    //Load Pages...
    const handleClick = () => {
        setPage(prevPage => prevPage + 1);
        };
    // console.log(`Clicked ${page}`)


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
            setMovieData(prevData => {
                // Create a Set to remove potential duplicates
                const uniqueMovies = new Set([...prevData, ...data.results].map(movie => movie.id));
                // Convert back to an array of full movie objects
                return [...prevData, ...data.results].filter((movie, index, self) => 
                    uniqueMovies.has(movie.id) && self.findIndex(m => m.id === movie.id) === index
                );
            });
        } catch (error) {
            console.error(error);
        }
    };
    
    const fetchData = async (page, searchTerm) => {
        try {
            const apiKey = import.meta.env.VITE_APP_API_KEY;
            const url = searchTerm
                ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&page=${page}`
                : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
    
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch movie data');
            }
            const data = await response.json();
            setMovieData(prevData => {
                // Create a Set to remove potential duplicates
                const uniqueMovies = new Set([...prevData, ...data.results].map(movie => movie.id));
                // Convert back to an array of full movie objects
                return [...prevData, ...data.results].filter((movie, index, self) => 
                    uniqueMovies.has(movie.id) && self.findIndex(m => m.id === movie.id) === index
                );
            });
        } catch (error) {
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
    // console.log(parsedData);

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
            {parsedData.map((movie, idx)  => (
                <div className="movie-card" key={idx}>
                    <MovieCard movieTitle={movie.movieTitle} posterImage={movie.posterImage} movieVoteAverage={movie.movieVoteAverage} onClick={() => setSelectedMovie(movie) } 
                        />
                        
                </div>
            ))}   
            </div> 
            <button onClick={handleClick} className="load-button">Load More...</button> 
        </div>

        {selectedMovie && (
            <Modal show={selectedMovie != null}
            onClose={() => setSelectedMovie(null)}
            movieTitle={selectedMovie.movieTitle}
            movieBackdrop={selectedMovie.movieBackdrop}
            releaseDate={selectedMovie.releaseDate}
            movieOverview={selectedMovie.movieOverview}
            movieId={selectedMovie.movieId}
            // trailerUrl={selectedMovie.trailerUrl}
            genres={selectedMovie.genres}/>
        )}
        
        <footer>
        <div className="footer-links">
            <a className="footer-class" href="https://github.com/Kisadore">Contact </a>

            <a className="footer-about" href="https://github.com/Kisadore/flixster/blob/main/README.md">About</a>
         
        </div >
        &copy; 2024 Kiahna Isadore, Inc.
        </footer>
        </>
    );
};

export default MovieList;