import  { useState } from "react";
import PropType from 'prop-types';
import "./Modal.css";

export default function Modal({title, releaseDate, overview,genres,trailer}) {
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
        View
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>{title}</h2>
            <h3>Released on: {releaseDate}</h3>
            <h3>Genres: {genres}</h3>
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
    genres: PropType.string.isRequired,
    trailer: PropType.string.isRequired
}