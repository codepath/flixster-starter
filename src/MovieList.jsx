import "./MovieList.css"
import { RenderMovie } from "../rendermovie/RenderMovie"
import MovieCard from "./MovieCard"
// import PropTypes from "prop-types"

function MovieList({onClick,results}){//handles the display of all the moviecards
   
        //console.log(results)
        const movieList = RenderMovie(results) //calling render movie on results, the array of movie details we need 
        return(
            <div className="MovieCard">
                {
                movieList.map((obj,index) => { // using map to extract those properties like image, title, rating etc
                    return(
                        <MovieCard key = {index} image = {obj.image} title = {obj.title} rating = {obj.rating} overview = {obj.overview} onClick = {() => onClick(obj)}/> //
                    )   
                })
    }
            </div>
        )
    }

export default MovieList