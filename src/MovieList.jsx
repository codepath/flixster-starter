import { useState, useEffect } from "react";
import MovieCard from "./MovieCard"; //contains movie information
import "./MovieList.css"

// Purpose: Create card elements from API info
const MovieList = () => {
    const [data,setData] = useState([]) // create data (will hold json elements)
    const [page, updatePage] = useState(1);//State starts at 1 since link starts at 1

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` //private token used to access api
        }
      };
      
      const fetchData = async () => {
        const resp = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, options)//fills link

        const Data = await resp.json()
        
        setData(prevData => [...prevData, ...Data.results]);//appends results to end
    }
    useEffect(() => {
        fetchData();
    }, [page]);//adds to update for every new page

    console.log(data)
        return(//creates movie card element
            <div className="movie-row"> 
             {data.length > 0 ? (
                data.map(movie => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        poster={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        rating={Math.round(movie.vote_average *100)/100} //get two decimal points
                    />
                ))
            ) : (
                <p>Loading movies...</p>//error handle if data length == 0
            )} 
            <button className="load-btn" onClick={() => updatePage(prevPage => prevPage + 1 )}>
                Show More
            </button>
        </div>
        );
    };
export default MovieList;