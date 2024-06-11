import './MovieList.css';
import MovieCard from './MovieCard.jsx';
function MovieList(props){
    const id = []

    function createMovieCards(card){
        if(!id.includes(card.id)){
            id.push(card.id);
            return(
                <MovieCard
                movieID={card.id}
                title={card.title}
                img={"https://image.tmdb.org/t/p/w500" +card.poster_path}
                rating = {card.vote_average}/>
            )
        }
        }

    return(
        <div className='movieCards'>
            {props.data.map(createMovieCards)}
        </div>
    )
}
export default MovieList;
