import Modal from './Modal';
import './MovieCard.css';
import { useState } from 'react';
import { imageGuard } from './utils/utils';

function MovieCard({ imgSrc, title, rating, genres, overview, date, id, trailer }) {
    const [modalView, setModalView] = useState(false);
    const [runtime, setRuntime] = useState('');
    const [trailerKey, setTrailerKey] = useState('');

    const showModal = () => {
        setModalView(true);
        fetchRuntimeData()
        fetchTrailerData();
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

    const fetchTrailerData = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response fail');
        }
        const data = await response.json();
        console.log("data results", data.results);
    
        // different movies have the "trailer" in different indexes so this is an attempt to remedy this by sifting through to find a key including trailer
        const trailerVideo = data.results.find(video => video.name.toLowerCase().includes('trailer'));
        if (trailerVideo) {
            setTrailerKey(trailerVideo.key);
            console.log("Trailer key", trailerVideo.key);
        } else {
            setTrailerKey('');
        }
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
                trailer={trailerKey}
            />
        </>
    );
}

export default MovieCard;