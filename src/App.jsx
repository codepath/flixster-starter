import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./MovieList";
import SearchComponents from "./SearchComponents";
import "./Header.css";
import Sort from "./Sort";
import { MovieModal } from "./MovieModal";
import "./footer.css";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGM4OGY3ZWI4ZDU2YThkNWYzYjY3MzI4ZjU2YTM2ZSIsIm5iZiI6MTc0OTUzMzI3OC4yMjcsInN1YiI6IjY4NDdjMjVlZWM3MzI5M2NkN2JiMzZhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uhoqn3XL1sDXT-jJhsIbVMI2gzkhF5hzYOgdF9M8zA0",
  },
};
function App() {
  const [openModal, setOpenModal] = useState(false); //default state of modal
  const [movie, setMovie] = useState("Mission Impossible"); //default state of movie
  const [results, setResults] = useState([]); //default state of results array
  const [pageNumber, setPageNumber] = useState(1); //default state of page number
  function toNextPage() {
    setPageNumber(pageNumber + 1);
  } //function to increase the page number. used for the load more functionality
  async function fetchMovies(page = pageNumber) { //function to actually fetch the movies
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`, // API call
        options
      );
      if (!response.ok) { //if the call wasn't succesful,
        throw new Error("Can't load movies"); //message this.
      }
      const data = await response.json();
      //console.log(data);
      setResults((prev) => page > 1 ? [...prev, ...data.results] : data.results);//set results to be prev and next page combined if page number is greater than 1, otherwise set it to be just prev page.
      // setResults(data.results);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log("mess");
    fetchMovies();
  }, [pageNumber]);//calling the function fetchMovies and making it change as pageNumber changes
  return (
    <div className="App">
      <header className="Header">
        <h1>🎥 Flixster 🎬</h1>
        <SearchComponents //search call
        setResults={setResults} /> 
        <Sort //sort call
        setResults={setResults} movies={results} />
      </header>
      <MovieList //movielist function call 
        onClick={(movie) => {
          setMovie(movie);
          setOpenModal(true);
        }}
        results={results}
      />
      {openModal && ( //modal content
        <MovieModal
          closeModal={setOpenModal}
          keyId={movie.id}
          image={movie.image}
          overview={movie.overview}
          release_date={movie.release_date}
          title={movie.title}
        />
      )}
      <button //load more functionality
      className="loadBtn" onClick={toNextPage}>
        LOAD MORE
      </button>
      <footer className="Footer">
        <p>
          &copy; the joseph akintunde entertainment company llc 2030. All Rights
          Reserved
        </p>
        <a className="tospp" href="#">
          Terms of Service and Privacy Policy
        </a>
        <div className="socials">
          <a href="https://www.instagram.com/jausephh/?hl=en">
            <img
              width="50px"
              src="src/assets/instagram.png"
              alt=""
            />
          </a>
          <a href="https://www.linkedin.com/in/joseph-akintunde-4a1492288/">
            <img
              width="40px"
              src="src/assets/linkedin.png"
              alt=""
            />
          </a>
          <a href="https://github.com/joseph-akintunde/flixster-starter">
            <img className="git" width="40px" src="src/assets/imagesgit.png" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
