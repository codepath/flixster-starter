import "./MenuBar.css";

function MenuBar({ movie, setOpenModal, setView }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer  menu-bar">
        <div className="menuCloseBtn">
          <button className="closeMenuX" onClick={() => {setOpenModal(false)}}> X </button>
        </div>
        <div className="body">
          <p className="menuText" onClick={() => setView('movies')}> <i className="fa-solid fa-house"></i> Home </p>
          <p className="menuText" onClick={() => setView('favorites')}><i className="fa-solid fa-heart"></i> Favorites </p>
          <p className="menuText" onClick={() => setView('watchlist')}> <i className="fa-solid fa-list"></i> Watchlist </p>
        </div>
        <div className="footer">
          <button onClick={() => {setOpenModal(false)}} id="cancelBtn"> Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
