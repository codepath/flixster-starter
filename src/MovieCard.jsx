import './MovieCard.css';
import React from 'react';
import { useState } from 'react';
import Modal from './Modal.jsx';
// import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

function MovieCard(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [watched, setWatched] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
    }
    const toggleLike = (event) => {
        event.preventDefault();
        props.toggleLikedList(props.isLiked)
    }
    const likeButton = () =>{
        setLiked(prevState => !prevState);
    }
    const watchButton = () =>{
        setWatched(prevState => !prevState);
    }








    return (
        <>
            <div className='movie-card' >
                <img src={props.img} alt='Movie Image' className='movieImage' />
                <div className='movie-card-information'>
                    <p className='title'><strong>{props.title}</strong></p>
                    <p>{props.rating}</p>
                    <button onClick={openModal} className='view-details button'>View Details</button>
                    <span onClickCapture={toggleLike} caria-label="toggle-favorite"></span>
                    <button onClick={likeButton} className={`heart ${liked ? 'clicked' : ''} button`}>
                       {liked ? "Favorite!" : "Not Favorite?"}
                    </button>

                <div className='watched-button-unclicked'>
                    <button className={`watch-button ${watched ? "watched" : ""} button`} onClick={watchButton}>
                        {watched ? "Watched" : "Not Watched"}
                    </button>
                </div>
                </div>

            </div>
            {isModalOpen && <Modal close={closeModal} data={props}/>}

        </>
    )
}
export default MovieCard;
