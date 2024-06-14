import './Modal.css';
import FocusTrap from "focus-trap-react"
import { genre_to_id, swap, timeFormat } from './utils/utils';
import { imageGuard } from './utils/utils';
function Modal({ isOpen, imgSrc, title, genres, overview, date, closeModal, runtime, trailer }) {
    
    if (!isOpen) {
        return null;
    }

    const formattedTime = timeFormat(runtime);
    const genreKeys = swap(genre_to_id);
    const genreNames = [] 
    for(let i=0; i < genres.length ; i++){
        genreNames.push(genreKeys[genres[i]]);
    }

    const checkForTrailer = () => {
        if(trailer != ''){
            return  (
                <>
                <img src={imageGuard(imgSrc)} alt={`Poster of ${title}`}/>
                <iframe src={"https://www.youtube.com/embed/" + trailer}></iframe>
                </>
            )
        } else {
            return (
                <>
                <img src={imageGuard(imgSrc)} alt={`Poster of ${title}`}/>
                <p>No Trailer Available</p>
                </>
            )
        }
    }

    return (
        <FocusTrap>
            <div className='modal' onClick={closeModal}>
                <button onClick={closeModal}>Close</button>
                <p className='title'>{title}</p>
                <div className='movieMedia'>
                    {checkForTrailer()}
                </div>
                <p>{`Release date: ${date}`}</p>
                <p>{`Overview: ${overview}`}</p>
                <p>{`Genres: ${genreNames}`}</p>
                <p>{`Runtime: ${formattedTime}`}</p>
            </div>
        </FocusTrap>
    );
}

export default Modal;


