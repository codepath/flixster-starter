import { useState } from "react";
import FavoriteButton from "./FavoriteButton";


const FavoriteList = () => {
    const[favoriteCards, setFavoriteCards] = useState([]);
    const toggleFavorite = (card) =>{
        setFavoriteCards((prevFavorites) => {
            if(prevFavorites.includes(card)){
                return prevFavorites.filter((fav)=> fav !== card);
            }else{
                return [...prevFavorites,card];
            }
        });
    };
    return(
        <div>
            {
                favoriteCards.map((card) =>(
                    <div key = {card.id}>
                        <h3>{card.title}</h3>
                        <FavoriteButton
                            isFavorite={favoriteCards.includes(card)}
                            onToggle={()=>toggleFavorite(card)}
                        />
                    </div>
                ))
            }
            console.log(favoriteCards);

        </div>
    );
};

export default FavoriteList;