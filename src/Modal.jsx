import './Modal.css';
function Modal({ isOpen, imgSrc, title, genres, overview, date, closeModal }) {
    const baseImgURL = "https://image.tmdb.org/t/p/w500";

    if (!isOpen) {
        return null;
    }

    return (
             <div className='modal' onClick={closeModal}>
                <button onClick={closeModal}>Close</button>
                <p className='title'>{title}</p>
                <img src={`${baseImgURL}${imgSrc}`} alt={`Poster of ${title}`}/>
                <p>{`Release date: ${date}`}</p>
                <p>{`Overview: ${overview}`}</p>
                <p>{`Genres: ${genres}`}</p>
            </div>
    );
}

export default Modal;

