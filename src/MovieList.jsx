import { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import Nav from "./Nav";

// Purpose: Create card elements from API info
export const MovieList = () => {
  const [data, setData] = useState([]);
  const [page, updatePage] = useState(1);
  const [searchText, updateSearchText] = useState("");
  const [modalOpen, setShowModal] = useState(false);
  const [selectedMovieInfo, updateMovieInfo] = useState(null);
  const [sortString, sortBy] = useState("");
  const [lastAction, updateLastAction] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [genre, updateGenreFilter] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`, //private token used to access api
    },
  };

  const applySort = (newSortString) => {
    updateLastAction("sort");
    sortBy(newSortString); // Update sort state
    updatePage(1); // Reset to the first page
    updateGenreFilter(""); // Clear the genre filter
  };

  const performSearch = () => {
    if (searchText === "") {
      return;
    }
    updateLastAction("search");
    updatePage(1); // Reset to the first page
    fetchData(); // Manually trigger data fetching
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
      setData(page === 1 ? [...data.results] : [...data, ...data.results]); // Handle pagination
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
        updateSearchText={updateSearchText}
        sortBy={sortBy}
        updatePage={updatePage}
        updateLastAction={updateLastAction}
        fetchData={fetchData}
        showSearch={showSearch}
        searchText={searchText}
        performSearch={performSearch}
        applySort={applySort}
        updateGenreFilter={updateGenreFilter}
      />
      <div className="movie-row">
        {data.length > 0 ? (
          data.map(
            (
              movie // no shadow til hover
            ) => (
              <MovieCard // blur shadow for effect
                key={movie.id} //styling ligh dark purple and green
                title={movie.title}
                poster={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                rating={Math.round(movie.vote_average * 100) / 100} //get two decimal points
                clickHandler={() => toggleModal(movie.id)}
              />
            )
          )
        ) : (
          <p>No movies found...</p> //error handle if data length == 0
          //hide show more
        )}
        {data.length > 0 && (
          <button className="load-btn" onClick={changePage}>
            Show More
          </button>
        )}
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
