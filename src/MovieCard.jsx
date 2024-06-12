import Modal from './Modal';
import './MovieCard.css';
import { useState } from 'react';

function MovieCard({ imgSrc, title, rating, genres, overview, date }) {
    const [modalView, setModalView] = useState(false);
    const baseImgURL = "https://image.tmdb.org/t/p/w500";

    const showModal = (e) => {
        e.stopPropagation();
        setModalView(true);
    };

    return (
        <>
            <div className='card' onClick={showModal}>
            <img src={`${baseImgURL}${imgSrc}`} />
            <p className='title'>{title}</p>
            <p>{`Rating: ${rating}`}</p>

            </div>
            <Modal 
                isOpen={modalView} 
                imgSrc={imgSrc} 
                title={title} 
                genres={genres} 
                overview={overview} 
                date={date}
            />
        </>
    );
}

export default MovieCard;