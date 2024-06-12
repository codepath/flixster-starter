import './MovieCard.css';
/*import FavoriteButton from './FavoriteButton';*/
import Modal from './Modal';
import PropType from 'prop-types';

function MovieCard({title, imgSrc, avgRating, description,releaseDate,trailer,genres,runtime,backdrop_photo}){
    return(
        <>
        
            <div className='movie-card'>
                <img src={imgSrc} alt="Image could not be loaded." className='movieImage'/>
                {/* <h3 className='movieTitle'>{title}</h3> */}
                <p className='movieAvgRating'>Rating: {avgRating}</p>
                <Modal
                    title={title}
                    releaseDate={releaseDate}
                    overview={description}
                    genres={genres}
                    trailer={trailer}
                    runtime={runtime}
                    backdrop_path={backdrop_photo}

                />
            </div>
        
        </>
    );
}


MovieCard.propTypes={
    title: PropType.string.isRequired,
    imgSrc: PropType.string.isRequired,
    avgRating: PropType.number.isRequired,
    description: PropType.string.isRequired,
    releaseDate: PropType.string.isRequired,
    trailer:PropType.string.isRequired,
    genres: PropType.array.isRequired,
    runtime:PropType.string.isRequired,
    backdrop_photo: PropType.string.isRequired
};


export default MovieCard;