import "./Modal.css";

function Modal({ movie, setOpenModal, getGenreName }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className= "xSign" onClick={() => {setOpenModal(false)}}> X </button>
        </div>
        <div className="title">
          <h2>{movie.title}</h2>
        </div>
        <div className="body">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
          <p className="modalText">Release Date: {movie.release_date} </p>
          <p className="modalText">Overview: {movie.overview} </p>
          <p className="modalText">Genres:{getGenreName(movie.genre_ids)}</p>
          <img className="backdrop" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/>
        </div>
        <div className="footer">
          <button onClick={() => {setOpenModal(false)}} id="cancelBtn"> Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
