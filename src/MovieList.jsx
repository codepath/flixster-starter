import { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import Modal from "./Modal";

// Purpose: Create card elements from API info
export const MovieList = () => {
  const [data, setData] = useState([]);
  const [page, updatePage] = useState(1);
  const [searchText, updateSearchText] = useState("");
  const [modalOpen, setShowModal] = useState(false);
  const [selectedMovieInfo, updateMovieInfo] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`, //private token used to access api
    },
  };

  const searchMovies = () => {
    updatePage(1);
    setData([]);
    fetchData();
  };

  const changePage = () => {
    updatePage(
      (prevPage) => prevPage + 1,
      () => {
        fetchData();
      }
    );
  };

  const toggleModal = async (movie_id) => {
    const movieInfoResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
      options
    );
    const movieInfoData = await movieInfoResponse.json();
    updateMovieInfo(movieInfoData);
    setShowModal((prev) => !prev);
  };

  const genre_convert = (ids) => {
    if (!selectedMovieInfo || !selectedMovieInfo.genres || !ids) {
      return "";
    }
    return ids
      .map(
        (id) => selectedMovieInfo.genres.find((genre) => genre.id === id)?.name
      )
      .filter((name) => name) // filter out any undefined values
      .join(", ");
  };

  const fetchData = async () => {
    if (searchText === "") {
      //add if dropdown menu
      const resp = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
        options
      );
      const Movies = await resp.json();
      if (page === 1) {
        setData([...Movies.results]);
      } else {
        setData((prevData) => [...prevData, ...Movies.results]); //appends results to end
      }
    } else {
      //option for drop down
      const resp = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`,
        options
      );
      const Movies = await resp.json();
      if (page === 1) {
        setData([...Movies.results]);
      } else {
        setData((prevData) => [...prevData, ...Movies.results]); //appends results to end
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

        <select name="sort" id="">
          <option disabled selected value="">
            Sort by
          </option>
          <option value="popular">Popular</option>
          <option value="top-rated">Top rated</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
      <div className="movie-row">
        {data.length > 0 ? (
          data.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              rating={Math.round(movie.vote_average * 100) / 100} //get two decimal points
              clickHandler={() => toggleModal(movie.id)}
            />
          ))
        ) : (
          <p>No movies found...</p> //error handle if data length == 0
        )}
        <button className="load-btn" onClick={changePage}>
          Show More
        </button>
      </div>
      {modalOpen && selectedMovieInfo && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setShowModal(false)}
          title={selectedMovieInfo.name}
          poster={`https://image.tmdb.org/t/p/original${selectedMovieInfo.poster_path}`}
          release={selectedMovieInfo.release_date}
          overview={selectedMovieInfo.overview}
          genres={genre_convert(
            selectedMovieInfo.genres.map((genre) => genre.id)
          )}
        />
      )}
    </>
  );
};
export default MovieList;
