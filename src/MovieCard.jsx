import './MovieCard.css';
function MovieCard(props){
    
    return(
            <div className='movie-card'>
                <img src={props.img} alt='Movie Image' className='movieImage'/>
                <p><strong>{props.title}</strong></p>
                <p>{props.rating}</p>
            </div>
    )
}
export default MovieCard;
