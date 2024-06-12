import  { useState } from "react";
// import PropType from 'prop-types';
import "./Modal.css";

export default function Modal({title, overview, releaseDate, genre, trailer, runtime, backdrop_photo}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Learn More
      </button>

      {modal && (
        <div className="overlay" onClick={toggleModal}>
          <div  className="modal" ></div>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={`https://image.tmdb.org/t/p/w500${backdrop_photo}`} alt="Image could not be loaded." />
            <h2>{title}</h2>
            <h3>Released on: {releaseDate}</h3>
            <h3>Genre: {genre}</h3>
            {/* <h3>Runtime: {runtime}</h3> */}
            <p>
              Overview: {overview}
            </p>

            <video src={trailer}></video>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
    title: PropType.string.isRequired,
    releaseDate: PropType.string.isRequired,
    overview: PropType.string.isRequired,
    genres: PropType.array.isRequired,
    trailer: PropType.string.isRequired,
    runtime: PropType.string.isRequired,
    backdrop_path: PropType.string.isRequired
}