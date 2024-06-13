import { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import Nav from "./Nav";

// Purpose: Create card elements from API info
export const MovieList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [MovieInfo, setMovieInfo] = useState(null);
  const [sortString, setSortString] = useState("");
  const [lastAction, setLastAction] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [genre, setGenreFilter] = useState("");
  const [seenMovies, setSeenMovies] = useState([]);
  const [lovedMovies, setLovedMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`, //private token used to access api
    },
  };

  const toggleSeen = (movieId) => {
    setSeenMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const toggleLoved = (movieId) => {
    setLovedMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const applySort = (newSortString) => {
    setLastAction("sort");
    setSortString(newSortString); // Update sort state
    setPage(1); // Reset to the first page
    setGenreFilter(""); // Clear the genre filter
  };

  const performSearch = () => {
    if (searchText === "") {
      return;
    }
    setLastAction("search");
    setSortString("");
    setGenreFilter("");
    setPage(1);
    setData([]);
    fetchData();
  };

  const changePage = () => {
    setPage(
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
    setMovieInfo(movieInfoData);
    setShowModal((prev) => !prev);
  };

  const genre_convert = (ids) => {
    if (!MovieInfo || !MovieInfo.genres || !ids) {
      return "";
    }
    return ids
      .map((id) => MovieInfo.genres.find((genre) => genre.id === id)?.name)
      .filter((name) => name) // filter out any undefined values
      .join(", ");
  };

  useEffect(() => {
    fetchData();
  }, [page, sortString, lastAction, genre]); // update on change

  const fetchData = async () => {
    let baseUrl = "https://api.themoviedb.org/3";
    let url = `${baseUrl}/movie/now_playing?language=en-US&page=${page}`;

    if (genre) {
      url = `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&with_genres=${genre}`;
    } else if (lastAction === "search" && searchText !== "") {
      url = `${baseUrl}/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`;
    } else if (lastAction === "sort" && sortString !== "") {
      url = `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortString}`;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (page === 1) {
        setData(data.results);
      } else {
        setData((prevData) => [...prevData, ...data.results]); // Append new data to existing data
      }
    } catch (error) {
      console.error("Fetching data failed:", error);
    }
  };
  return (
    //creates movie card element
    <>
      <Nav
        setShowSearch={setShowSearch}
        setData={setData}
        updateSearchText={setSearchText}
        sortBy={setSortString}
        updatePage={setPage}
        updateLastAction={setLastAction}
        fetchData={fetchData}
        showSearch={showSearch}
        searchText={searchText}
        performSearch={performSearch}
        applySort={applySort}
        updateGenreFilter={setGenreFilter}
      />
      <div className="movie-row">
        {data.length > 0 ? (
          data.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              rating={Math.round(movie.vote_average * 100) / 100}
              clickHandler={() => toggleModal(movie.id)}
              seen={seenMovies.includes(movie.id)}
              loved={lovedMovies.includes(movie.id)}
              toggleSeen={() => toggleSeen(movie.id)}
              toggleLoved={() => toggleLoved(movie.id)}
            />
          ))
        ) : (
          <p>No movies found...</p> //error handle if data length == 0
        )}
        {data.length > 0 && (
          <button className="load-btn" onClick={changePage}>
            Show More
          </button>
        )}
      </div>
      {showModal && MovieInfo && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={MovieInfo.name}
          poster={`https://image.tmdb.org/t/p/original${MovieInfo.poster_path}`}
          release={MovieInfo.release_date}
          overview={MovieInfo.overview}
          genres={genre_convert(MovieInfo.genres.map((genre) => genre.id))}
        />
      )}
    </>
  );
};
export default MovieList;
