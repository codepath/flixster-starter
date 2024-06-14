import "./Modal.css";

function Modal({ movie, setOpenModal, getGenreName, trailers}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer"
      style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`, backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="titleCloseBtn">
          <button className= "xSign" onClick={() => {setOpenModal(false)}}> X </button>
        </div>
        <div className="title">
          <h2>{movie.title}</h2>
        </div>
        <div className="body modal-body">
          <img alt="Movie poster image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
          <p className="modalText">Release Date: {movie.release_date} </p>
          <p className="modalText">Overview: {movie.overview} </p>
          <p className="modalText">Genres: {getGenreName(movie.genre_ids)}</p>
          {trailers[movie.id] && (
            <div className="trailer">
              <iframe
              width= '600'
              height="300"
              src={`https://www.youtube.com/embed/${trailers[movie.id]}`}
              allow="autoplay"
              title={movie.title}>
              </iframe>
            </div>
          )}
        </div>
        <div className="footer">
          <button onClick={() => {setOpenModal(false)}} id="cancelBtn"> Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
