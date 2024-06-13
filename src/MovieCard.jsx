import Modal from "./Modal";
import "./MovieCard.css"
import EmptyHeart from './assets/heart1.png'
import Heart from './assets/heart2.png'
import { useState, useEffect} from "react";

const MovieCard = (props) => {
    const[heart, setHeart] = useState(EmptyHeart);
    function handleClick () {
        props.query(props.id);
        props.handleOpening()
    }
    function ChangeHeart(e){
        e.stopPropagation();
        if(e.target.src.substring(e.target.src.length - 10) === "heart1.png"){
            setHeart(Heart);
        } else {
            setHeart(EmptyHeart);
        }
    }
    function Check(e){
        e.stopPropagation();
    }
    useEffect(() => {
      }, [heart]);

    return (
    
        <div className="card clear-fix" onClick={handleClick}>
            <div className="cards card-movie">
                <img src={props.url} className="img-responsive" alt="Cards Image"/>
                <span className="card-movie__rect"></span>
                <ul className="card-movie__list">
                <li>Rating: ⭐{props.rating}</li>
                </ul>
                <span className="card-movie__tri"></span>
                <p>{props.title}</p>
            </div>
            <div className="heart">
                <img className="heart-image" src={heart} onClick={ChangeHeart}></img>
                <input type="checkbox" id="scales" onClick={Check}></input>
            </div>
          </div>
    )
}   
export default MovieCard;