import './MovieList.css';
import MovieCard from './MovieCard';
import {useState, useEffect} from 'react';
function MovieList(){
    // const [page,setPage]= useState(1);

    // const LoadMore= () => {
    //     setPage(page+1);

    // }
    const [page, setPage] = useState(1);
    const [movieList, setMovieList] = useState([]);

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



    // const fetchData = async () => {
    //     let url = 'https://api.themoviedb.org/3/movie/now_playing'
    //     const apiKey = import.meta.env.VITE_API_KEY
    //     url += `?api_key=${apiKey}`
    //     url += `&page=${page}`
        
    //     const response = await fetch(url)
    //     const data= await response.json()
    //     // console.log(data.results)
    //     setMovieList(data.results)
    // }

    



    // const parsedData = movieList ? movieList : [];
    return(
        <div>
            
            <div className='movies'>
                {console.log(movieList)}
                {movieList?.map((movie, i)=> {return (
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