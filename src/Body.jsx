import MovieList from "./components/MovieList";
import './Body.css'

export default function Body({data, load, addToFav, addToWatch, display}) {

    return (
        <section className="Body">
            <MovieList data={data} load={load} addToFav={addToFav} addToWatch={addToWatch} display={display}/>
        </section>
    );
}