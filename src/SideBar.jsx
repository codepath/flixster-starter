import React from 'react';
import './SideBar.css';

const SideBar = (props) => {
    // console.log(props)
    // const posterImage = `https://image.tmdb.org/t/p/w500${props.likedMovies.movieImage}`
    return (
        <div className={props.showing ? 'side-bar active' : 'side-bar'}>
            <div className="side-bar-title">
                <h2>SideBar</h2>
            </div>
            <div className="side-bar-content">
                <ul className="side-bar-list">
                    <div className="liked-movies-div">
                        <li className="liked-movies">Liked Movies</li>
                        {/* <img src={posterImage} alt="poster" /> */}
                        <p></p>
                    </div>
                    <div className="watched-movies-div">
                        <li className="watched-movies">Watched Movies</li>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;
