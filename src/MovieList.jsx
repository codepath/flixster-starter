import { useEffect, useState } from 'react';
import './MovieList.css';
import MovieCard from './MovieCard';



const MovieList = (props) => {
    const uniqueMovies = Array.from(new Map(props.data.map(movie => [movie.id, movie])).values());
    // replace uniqueMovies with the props and handle search call in Search.jsx
    return (
        <>
            <div className='movie-list'>
            {uniqueMovies.map(movie => {
                const posterImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                return (
                    <div key={movie.id} onClick={() => props.handleMovieClick(movie.id)}>
                    <MovieCard key={movie.id} id={movie.id} image={posterImage} title={movie.title} rating={movie.vote_average.toFixed(1)} releaseDate={movie.release_date} movieOverview={movie.overview} movieGenres={movie.genre_ids}/>
                    </div>
                );
            })}
            </div>
                <br />
                <button id="load-more" onClick={props.loadMore}>Load More</button>
        </>
    );
};

export default MovieList
