import './SideBar.css'
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
function SideBar(props){
    const [moviesData, setMoviesData] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY;

    const getMoviesData = async (movieID) => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer' + apiKey
            }
          };
        const response = await fetch('https://api.themoviedb.org/3/movie/' + movieID ,options);
        if (!response.ok) {
            console.log(response);
            return null;
        }
        return await response.json();
    }

    const updateMoviesLikedList = async() => {
        let likedMovies = [];
        for (let i = 0; i < props.likedMoviesInformation.length; i++) {
            let movieData = await getMoviesData(props.likedMoviesInformation[i]);
            console.log(movieData);
            likedMovies.push(movieData);
        }
        setMoviesData(likedMovies);
    }
    useEffect(() => {
        updateMoviesLikedList();
    }, [props.likedMoviesInformation]);

    return(
        <div className="sidebar">
            <p>Liked Movies: </p>
            {moviesData.map((props) => {
                console.log(moviesData);
                return(
                    <MovieCard
                    key={props.id}
                    name={props.title}
                    isLiked = {true}
                    toggleLikedList = {(isRemove) => {}}/>
                )

            })}

        </div>
    )
}
export default SideBar;

//movieID={card.id}

//title={card.title}
//
