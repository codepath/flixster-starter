import './MovieList.css'
import MovieCard from './MovieCard'



function MovieList({ data }) { 
    return (
        <div className='list'>
           
        {data.map(movie => (
            <div className='movie' key={movie}>
                <MovieCard
                imgSrc={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
                genres={movie.genre_ids} 
                overview={movie.overview}
                date={movie.release_date}
                id={movie.id}
                />
            </div>

                
        ))}
            
        </div>


    );
}

export default MovieList;