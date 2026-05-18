import { useState } from "react";
import Modal from "./Modal";
import MovieCard from "./MovieCard";
import '../styles/MovieList.css'
import '../styles/LoadButton.css'

export default function MovieList({data,load,addToFav, addToWatch, display}) {
    //Modal state data
    const [mov, setMov] = useState({})
    const [show, setShow] = useState(false);

    const close = () => setShow(false);
    const open = id => event => {
        setMov(data.find(movie => movie.id === id))
        setShow(true);
    }

    if(data.length > 0){
        return (
            <>
            <section className="MovieList">
                    {data.map((movie) => {
                        return <MovieCard movie={movie} loadModal={open(movie.id)} key={movie.id}
                        addToFavs={addToFav} addToWatched={addToWatch}/>
                    })}
            </section>
            <button className={display ? 'loadMore' : 'hide-load-more-button'} onClick={load}>Load More</button>
            <Modal display={show} closeModal={close} movie={mov}/>
            </>
        );
    }else {
        return (
            <div className="no-movies-splash">
                <h2 className="splash-text">No movies here...</h2>
                <h3 className="splash-icon">{'\u{2639}'}</h3>
            </div>
        );
    }
}