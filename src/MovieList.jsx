import './MovieList.css';
import MovieCard from './MovieCard';
import {useState, useEffect} from 'react';
function MovieList(){
    
    // const[search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [movieList, setMovieList] = useState([]);
    // const [query, setQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    

    function updateSearch(e){
        setFilteredMovies(
            movieList.filter(movie => movie.title.toLowerCase().includes((e.target.value).toLowerCase()))
        )

    }
    useEffect(()=>{
        setFilteredMovies(movieList);
    },[movieList])



    // const filteredMovies = movieList.filter(movie => {
    //     return movie.title.toLowerCase().includes(query.toLowerCase())
    // },[movieList, query])


    useEffect(() =>{
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTk4ZTdhNDAzODljYmRlYjQwMTQ0OTQ1ZGQwYTMxZiIsInN1YiI6IjY2Njc3MTY3ZGQzYTMzZDdhZjg1YTVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DMEfKAm2887y-Rm2Qj9F66yNZjFJ28QrgcE2ktrx8tc'
            }
          };
         
        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, options)
            .then(response => response.json())
            .then(response => setMovieList([...movieList, ...response.results]))
            .catch(err => console.error(err));
    },[page]);

    const increasePage = () =>{
        setPage(page+1);
    }


    return(
        <div>
            <div className='search_bar_container'>
            {/* value = {query }onChange={e => setQuery(e.target.value)} */}
                <input  id="search_bar" placeholder='Search for movies...' onChange={updateSearch}>
                
                </input>
                

            </div>
            <div className='movies'>
                {/* {console.log(movieList)} */}
                {filteredMovies?.map((movie, i)=> {return (
                    <MovieCard key={i}
                    title={movie.title}
                    avgRating={movie.vote_average}
                    imgSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    description={movie.overview}
                    releaseDate={movie.release_date}
                    trailer=''
                    genres={movie.genre_ids}
                    runtime=''
                    backdrop_photo={movie.backdrop_path}
                    />)
                    
                })}

            </div>

            <div className='loadMore-container'>
                <button onClick={increasePage} id='loadMore'>
                    Load More
                </button>
            </div>
                

        </div>
    );
    
}





export default MovieList;