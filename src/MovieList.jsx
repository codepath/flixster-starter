import './MovieList.css';
import MovieCard from './MovieCard.jsx';
import SideBar from './SideBar';
function MovieList(props) {
    const toggleLikeList = (movieID, isRemove) => {
        if(isRemove){
            props.setLikedMovies((prev) => {
                return props.likedMovies.filter((movieDataID) => movieDataID !== movieID);
            })
        }
        else{
            props.setLikedMovies((prev) => {
                return [...props.likedMovies, movieID];
            });
        }
    }
    function createMovieCards(card, i) {
        return (
            <MovieCard key={i}
                movieID={card.id}
                title={card.title}
                img={card.poster_path != null ? "https://image.tmdb.org/t/p/w500" + card.poster_path : 'https://www.pngmart.com/files/22/Carl-Jimmy-Neutron-PNG-File.png'}
                rating={card.vote_average}
                overview={card.overview}
                backdropImage = {card.backdrop_path != null ? "https://image.tmdb.org/t/p/w500" + card.backdrop_path : 'https://img.freepik.com/free-vector/vector-damask-seamless-pattern-background-classical-luxury-old-fashioned-damask-ornament-royal-victorian-seamless-texture-wallpapers-textile-wrapping-exquisite-floral-baroque-template_1217-738.jpg?t=st=1718339274~exp=1718342874~hmac=5b79e745851a4888614e6daf9ce85b622e8f4df2071e3432456ae64724dbf882&w=1380'}
                originalTitle = {card.original_title}
                releaseDate = {card.release_date}
                genres = {card.genre_ids}
                setFavoriteMovies={() => props.setFavoriteMovies(card.id)}
                setWatchedMovies={() => props.setWatchedMovie(card.id)}
                />
        )
    }
    return (
        <>
            <div className='movieCards'>
                {props.data.map((v, i) => createMovieCards(v, i))}
            </div>
        </>
    )
}
export default MovieList;
