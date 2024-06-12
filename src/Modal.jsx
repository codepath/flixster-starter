import "./Modal.css";

function Modal({ movie, setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenModal(false)}}> X </button>
        </div>
        <div className="title">
          <p>Movie Title</p>
        </div>
        <div className="body">
          <p>Release Date</p>
        </div>
        <div className="footer">
          <button onClick={() => {setOpenModal(false);}} id="cancelBtn"> Cancel</button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
