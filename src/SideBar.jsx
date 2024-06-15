import './SideBar.css'
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

function SideBar(props){



    function MovieCardForSideBar(movieID, index){
        // get selected movie from the list of movies
        const movie = props.movies.find((item) => item.id === movieID);
        return(
            // display updated state to the user (in the browser)
            <div key={index}>
                <img src={movie.poster_path != null ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : 'https://www.pngmart.com/files/22/Carl-Jimmy-Neutron-PNG-File.png"'} alt="Movie Poster" width="200" height="200" />
                <p className='texts'>{movie.title}</p>
            </div>
        )
    }
    return(
        <div className="sidebar">
            <div id='title-liked'>
                <h2>Favorites</h2>
            </div>
            <div className='favorite-cards'>
            {props.favoriteMovies.map(MovieCardForSideBar)}
            </div>
            <h2>Watched Movies: </h2>
            {props.watched.map(MovieCardForSideBar)}
        </div>
    )
}
export default SideBar;
