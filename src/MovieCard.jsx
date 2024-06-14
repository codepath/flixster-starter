import Modal from './Modal';
import './MovieCard.css';
import { useState } from 'react';
import { imageGuard } from './utils/utils';

function MovieCard({ imgSrc, title, rating, genres, overview, date, id }) {
    const [modalView, setModalView] = useState(false);
    const [runtime, setRuntime] = useState('');

    const showModal = (e) => {
        e.stopPropagation();
        setModalView(true);
        fetchRuntimeData()
    };

    const closeModal = () => {
        setModalView(false);
    }

    const fetchRuntimeData = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`)
        if (!response.ok) {
            throw new Error('Network response fail')
        }
        const data = await response.json();
        setRuntime(data.runtime)
    };


    return (
        <>
            <div className='card' onClick={showModal} key={id}>
            <img src={imageGuard(imgSrc)} />
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
                closeModal={closeModal}
                runtime={runtime}
            />
        </>
    );
}

export default MovieCard;