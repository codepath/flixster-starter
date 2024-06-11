import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

// Purpose: Create card elements from API info
const MovieList = () => {
  const [data, setData] = useState([]);
  const [page, updatePage] = useState(1);
  const [searchText, updateSearchText] = useState("");

  const searchMovies = () => {
    updatePage(1);
    setData([]);
    fetchData();
  };

  const resetPage = () => {
    console.log("resetPage");
    updatePage(
      // make sure that fetch data runs after updating prevPage
      (prevPage) => prevPage + 1,
      () => {
        fetchData();
      }
    );
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`, //private token used to access api
    },
  };

  const fetchData = async () => {
    if (searchText === "") {
      const resp = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
        options
      ); //fills link
      const Data = await resp.json();
      if (page === 1) {
        setData([...Data.results]);
      } else {
        setData((prevData) => [...prevData, ...Data.results]); //appends results to end
      }
      console.log("prev", Data.results);
    } else {
      const resp = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`,
        options
      );
      const Data = await resp.json();
      if (page === 1) {
        setData([...Data.results]);
      } else {
        setData((prevData) => [...prevData, ...Data.results]); //appends results to end
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]); //adds to update for every new page

  return (
    //creates movie card element
    <>
      <div>
        <input
          type="text"
          onChange={(e) => updateSearchText(e.target.value)}
          value={searchText}
        />
        <button onClick={searchMovies}>Search</button>
      </div>
      <div className="movie-row">
        {data.length > 0 ? (
          data.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              rating={Math.round(movie.vote_average * 100) / 100} //get two decimal points
            />
          ))
        ) : (
          <p>Loading movies...</p> //error handle if data length == 0
        )}
        <button className="load-btn" onClick={resetPage}>
          Show More
        </button>
      </div>
    </>
  );
};
export default MovieList;
