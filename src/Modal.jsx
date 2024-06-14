import './Modal.css';
import FocusTrap from "focus-trap-react"
import { genre_to_id, swap } from './utils/utils';
import { imageGuard } from './utils/utils';
function Modal({ isOpen, imgSrc, title, genres, overview, date, closeModal, runtime }) {
    
    if (!isOpen) {
        return null;
    }
    
    const baseImgURL = "https://image.tmdb.org/t/p/w500";

    function timeFormat(time){
        let hour = Math.floor(time/60).toString();
        let minute = time%60
        if(minute == 0 && hour == 0){
            return "no time provided"
        }
        if(minute < 10){
            return hour + ":0" +minute.toString() 
        }
        else{
            return hour +":" + minute.toString()
        }
    }
    const formattedTime = timeFormat(runtime);
    const genreKeys = swap(genre_to_id);
    const genreNames = [] 
    for(let i=0; i < genres.length ; i++){
        genreNames.push(genreKeys[genres[i]]);
    }
    return (
        <FocusTrap>
            <div className='modal' onClick={closeModal}>
                <button onClick={closeModal}>Close</button>
                <p className='title'>{title}</p>
                <img src={imageGuard(imgSrc)} alt={`Poster of ${title}`}/>
                <p>{`Release date: ${date}`}</p>
                <p>{`Overview: ${overview}`}</p>
                <p>{`Genres: ${genreNames}`}</p>
                <p>{`Runtime: ${formattedTime}`}</p>
            </div>
        </FocusTrap>
    );
}

export default Modal;

