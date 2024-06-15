import "./MenuBar.css";

function MenuBar({ movie, setOpenModal, setView }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer  menu-bar">
        <div className="menuCloseBtn">
          <button className="closeMenuX" onClick={() => {setOpenModal(false)}}> X </button>
        </div>
        <div className="menuOptions">
          <p className="menuText" onClick={() => setView('movies')}> <i className="fa-solid fa-house fa-solids"></i> Home </p>
          <p className="menuText" onClick={() => setView('favorites')}><i className="fa-solid fa-heart fa-solids"></i> Favorites </p>
          <p className="menuText" onClick={() => setView('watchlist')}> <i className="fa-solid fa-list fa-solids"></i> Watchlist </p>
        </div>
        <div className="footer">
          <button onClick={() => {setOpenModal(false)}} id="cancelBtn"> Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
