import Modal from './Modal';
import './MovieCard.css';
import { useState } from 'react';
import { imageGuard } from './utils/utils';

function MovieCard({ imgSrc, title, rating, genres, overview, date, id, trailer }) {
    const [modalView, setModalView] = useState(false);
    const [runtime, setRuntime] = useState('');
    const [trailerKey, setTrailerKey] = useState('');
    const [likeFill, setLikeFill] = useState("#c0c0c0")
    const [watchFill, setWatchFill] = useState("#c0c0c0") //silver

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
    
        // different movies have the "trailer" in different indexes so this is an attempt to remedy this by sifting through to find a key including trailer
        const trailerVideo = data.results.find(video => video.name.toLowerCase().includes('trailer'));
        if (trailerVideo) {
            setTrailerKey(trailerVideo.key);
        } else {
            setTrailerKey('');
        }
    };

    const likeHandler = (e) => {
        e.stopPropagation();
        if (likeFill == "#c0c0c0") {
            setLikeFill("#ff6961")
        }
        else {
            setLikeFill("#c0c0c0")
        }
    }

    const watchHandler = (e) => {
        e.stopPropagation();
        if (watchFill == "#c0c0c0"){
            setWatchFill("#b4d3b2")
        }
        else {
            setWatchFill("#c0c0c0")
        }
    }

    return (
        <>
            <div className='card' onClick={showModal} key={id}>
            <img src={imageGuard(imgSrc)} />
            <p className='title'>{title}</p>
            <p className='rating'>{`Rating: ${rating}`}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill={likeFill} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" onClick={likeHandler} className='like'/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill={watchFill} onClick={watchHandler} className="watch" viewBox="0 0 16 16">
            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
            </svg>

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