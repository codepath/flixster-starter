import "./Modal.css";

function Modal({ movie, setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenModal(false)}}> X </button>
        </div>
        <div className="title">
          <h2>{movie.title}</h2>
        </div>
        <div className="body">
          <img src={movie.poster_path}/>
          <p>Release Date: {movie.release_date} </p>
          <p>Overview: {movie.overview} </p>
          <p>Genres: </p>
          
        </div>
        <div className="footer">
          <button onClick={() => {setOpenModal(false)}} id="cancelBtn"> Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
