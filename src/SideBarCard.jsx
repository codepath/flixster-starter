import React from 'react';
import './SideBarCard.css';

const SideBarCard = (props) => {
    return (
        <div className="sidebar-card">
            <img className="sidebar-poster" src={props.image}/>
            <p className="sidebar-movie-title">{props.title}</p>
        </div>
    )
}

export default SideBarCard;
