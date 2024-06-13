import "./Modal.css";

function MenuBar({ movie, setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenModal(false)}}> X </button>
        </div>
        <div className="body">
          <p className="modalText">Home </p>
          <p className="modalText">Favorites </p>
          <p className="modalText">Watchlist </p>
        </div>
        <div className="footer">
          <button onClick={() => {setOpenModal(false)}} id="cancelBtn"> Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
