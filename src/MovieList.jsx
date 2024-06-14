import { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import Nav from "./Nav";
import SideBar from "./SideBar";

// Purpose: Create card elements from API info
export const MovieList = ({ isSidebarOpen, toggleSidebar }) => {
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
  const [trailer, setTrailer] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`, //private token used to access api
    },
  };

  const toggleSeen = (movie) => {
    setSeenMovies((prev) => {
      const isAlreadySeen = prev.some((m) => m.id === movie.id);
      return isAlreadySeen
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];
    });
  };

  const toggleLoved = (movie) => {
    setLovedMovies((prev) => {
      const isAlreadyLoved = prev.some((m) => m.id === movie.id);
      return isAlreadyLoved
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];
    });
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
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US&append_to_response=videos`;
    const movieInfoResponse = await fetch(url, options);
    const movie = await movieInfoResponse.json();
    setMovieInfo(movie);
    let trailerKey = "";
    for (let trailer of movie.videos.results) {
      if (trailer.type === "Trailer") {
        trailerKey = trailer.key;
        break;
      }
    }
    setTrailer(`https://www.youtube.com/embed/${trailerKey}`);
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
        <SideBar
          lovedMovies={lovedMovies}
          seenMovies={seenMovies}
          onMovieSelect={toggleModal}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        {data.length > 0 ? (
          data.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              rating={Math.round(movie.vote_average * 100) / 100}
              clickHandler={() => toggleModal(movie.id)}
              seen={seenMovies.some((m) => m.id === movie.id)}
              loved={lovedMovies.some((m) => m.id === movie.id)}
              toggleSeen={() =>
                toggleSeen({ id: movie.id, title: movie.title })
              }
              toggleLoved={() =>
                toggleLoved({ id: movie.id, title: movie.title })
              }
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
          title={MovieInfo.title}
          poster={`https://image.tmdb.org/t/p/original${MovieInfo.poster_path}`}
          release={MovieInfo.release_date}
          overview={MovieInfo.overview}
          genres={genre_convert(MovieInfo.genres.map((genre) => genre.id))}
          trailer={trailer}
        />
      )}
    </>
  );
};
export default MovieList;
