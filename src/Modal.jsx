import "./Modal.css";
const Modal = ({
  isOpen,
  onClose,
  title,
  poster,
  release,
  overview,
  genres,
}) => {
  const modalStyle = { display: isOpen ? "flex" : "none" };
  return (
    <div className="modal-overlay" style={modalStyle}>
      <div className="modal-content">
        <span id="close-modal" onClick={onClose}>
          &times;
        </span>
        <h2>{title}</h2>
        <img src={poster} alt="movie-poster" />
        <p>Release date: {release}</p>
        <p>Overview: {overview}</p>
        <p>Genres: {genres}</p>
      </div>
    </div>
  );
};
export default Modal;
