import.meta.env.VITE_API_KEY
import './MovieList.css'
import MovieCard from './MovieCard'

function MovieList() {
    return (
        <div className='list'>
           
            <MovieCard
            imgSrc=""
            title="test"
            rating="10"
            />
             <MovieCard
            imgSrc=""
            title="test"
            rating="10"
            />
             <MovieCard
            imgSrc=""
            title="test"
            rating="10"
            />
             <MovieCard
            imgSrc=""
            title="test"
            rating="10"
            />
             <MovieCard
            imgSrc=""
            title="test"
            rating="10"
            />


        </div>


    )
}

export default MovieList;