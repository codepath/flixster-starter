import './MovieList.css';
import MovieCard from './MovieCard';

function MovieList({data}){

    const parsedData = data ? data : [];
    return(
            <div className='movies'>
                {console.log(parsedData)}
                {parsedData.map((movie, i)=> {return (
                    <MovieCard key={i}
                    title={movie.title}
                    avgRating={movie.vote_average}
                    imgSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    description={movie.overview}
                    releaseDate={movie.release_date}
                    trailer=''
                    genres={movie.genre_ids}
                    />);
                })}
                {/* <MovieCard
                title='Movie Title'
                avgRating={8.0}
                imgSrc='download.png'
                description="This movie is great."
                releaseDate='12/12/12'
                trailer=''
                />
                <MovieCard
                title='Movie Title'
                avgRating={8.0}
                imgSrc='download.png'
                description="This movie is great."
                releaseDate='12/12/12'
                trailer=''
                />
                <MovieCard
                title='Movie Title'
                avgRating={8.0}
                imgSrc='download.png'
                description="This movie is great."
                releaseDate='12/12/12'
                trailer=''
                />
                <MovieCard
                title='Movie Title'
                avgRating={8.0}
                imgSrc='download.png'
                description="This movie is great."
                releaseDate='12/12/12'
                trailer=''
                />
                <MovieCard
                title='Movie Title'
                avgRating={8.0}
                imgSrc='download.png'
                description="This movie is great."
                releaseDate='12/12/12'
                trailer=''
                /> */}
               
              


            </div>
    );
}





export default MovieList;