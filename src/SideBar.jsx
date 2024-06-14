import React from 'react';
import { useState } from 'react';
import SideBarCard from './SideBarCard';
import './SideBar.css';

const SideBar = (props) => {
    const likedMovies = props.likedList;
    return (
        <div className={props.showing ? 'side-bar active' : 'side-bar'}>
            <div className="side-bar-title">
                <h2>SideBar</h2>
            </div>
            <div className="side-bar-content">
                <ul className="side-bar-list">
                    <div className="liked-movies-div">
                        <li className="liked-movies">Liked Movies</li>
                        {likedMovies.map(movie => (
                            <SideBarCard
                                key={movie.id}
                                className="sidebar-card"
                                id={movie.id}
                                title={movie.title}
                                image={movie.image}
                            />
                        ))}
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
