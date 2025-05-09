import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ data, updateFavorites, updateWatchlist }) => {
    return (
        <div className="list">
            {data.map(movie => (
                <MovieCard
                    key={movie.id}
                    imgSrc={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    genres={movie.genre_ids}
                    overview={movie.overview}
                    date={movie.release_date}
                    id={movie.id}
                    trailer={movie.trailer}
                    updateFavorites={updateFavorites}
                    updateWatchlist={updateWatchlist}
                />
            ))}
        </div>
    );
};

export default MovieList;
