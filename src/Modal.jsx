import './Modal.css';

const Modal = (props) => {
    const posterImage = `https://image.tmdb.org/t/p/w500${props.image}`;
    const genreNames = props.genres.map(genre => genre.name);
    const genreNamesString = genreNames.join(', ');
    let runtime;
    if(props.runtime === 0) {
        runtime = "Not Available"
    }else {
        runtime = `${props.runtime} minutes`
    }

    return (
        <div className='movie-modal' style={{ display: props.isClicked ? 'block' : 'none' }}>
            <div className='modal-content'>
                <div className='modal-image'>
                    <img src ={posterImage} id='modal-poster' />
                </div>
                <div className='modal-info'>
                    <p id="modal-title">{props.movieTitle}</p>
                    <p id='release-date'>Release Date: {props.releaseDate}</p>
                    <p id="runtime">Runtime: {runtime}</p>
                    <p id='movie-overview'>{props.movieOverview}</p>
                    <p id='movie-genre'>Genres: {genreNamesString}</p>
                </div>
                <span id='close-modal' onClick={props.toggleModal}>&times;</span>
            </div>
        </div>
    )
}

export default Modal;
