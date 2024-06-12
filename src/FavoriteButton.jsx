import './FavoriteButton.css';




const FavoriteButton = ({isFavorite, onToggle}) =>{
    return(
        <button className={`favorite-button ${isFavorite ? 'favorite': ''}`} onClick={onToggle}>
            <i className={`fa-regular fa-heart ${isFavorite ? 'favorite' : ''}`}></i>
        </button>
    )
}

export default FavoriteButton;