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
    const backdropImage = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${props.backdrop}`
    return (
        <div className='movie-modal' style={{ display: props.isClicked ? 'block' : 'none' }}>
            <div className='modal-content'>
                <div className='background-image' style={{ backgroundImage: `url(${backdropImage})` }} />
                <div className='modal-image'>
                    <img src ={posterImage} id='modal-poster' />
                </div>
                <div className='modal-info'>
                    <p id="modal-title">{props.movieTitle}</p>
                    <p id='release-date'>Release Date: {props.releaseDate}</p>
                    <p id="runtime">Runtime: {runtime}</p>
                    <p id='movie-overview'>{props.movieOverview}</p>
                    <p id='movie-genre'>Genres: {genreNamesString}</p>
                    <div className='movie-trailer'>
                        <iframe
                            width="200"
                            height="75"
                            src={props.videoLink}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
                <span id='close-modal' onClick={props.toggleModal}>&times;</span>
            </div>
        </div>
    )
}

export default Modal;
