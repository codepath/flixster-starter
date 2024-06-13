import './Modal.css';
import { format } from 'date-fns'

const Modal = (props) => {

    const posterImage = `https://image.tmdb.org/t/p/w500${props.image}`;
    const date = new Date(props.releaseDate);
    const formattedDate = format(date, 'MMMM d, yyyy');
    // movie genre returns undefined, might need to fetch genre information from API because it currently returns an array  of numbers, that's supposed oto map to genres???
    // console.log(props.movieGenre);
    return (
        <div className='movie-modal' style={{ display: props.isClicked ? 'block' : 'none' }}>
            <div className='modal-content'>
                <div className='modal-image'>
                    <img src ={posterImage} id='modal-poster' />
                </div>
                <div className='modal-info'>
                    <p id="modal-title">{props.movieTitle}</p>
                    <p id='release-date'>Release Date: {formattedDate}</p>
                    <p id='movie-overview'>{props.movieOverview}</p>
                    <p id='movie-genre'>{props.movieGenre}</p>
                </div>
                <span id='close-modal' onClick={props.toggleModal}>&times;</span>
            </div>
        </div>
    )
}

export default Modal;


{/* <Modal isClicked={isClicked} toggleModal={toggleModal} movieTitle={movie.title} image={movie.poster_path} releaseDate={movie.release_date} movieOverview={movie.overview} movieGenres={movie.genre_ids}/> */}
