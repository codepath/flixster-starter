import './MovieCard.css'


function MovieCard(props) {
  return (
    <>
      <div className='movieCards'>
        <div>
          <img src={props.poster_path}/>
          <p className='movieCard-title'>{props.title}</p>
          <i className="fa-solid fa-heart"></i>
          <p>Rating: {props.vote_average}</p>
        </div>
      </div>
    </>
  )
}

export default MovieCard;
