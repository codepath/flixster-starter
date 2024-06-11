import './App.css';
import MovieList from './MovieList';
import Search from './Search';

function App() {
  const getMovieData = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${import.meta.env.VITE_API_KEY}`, {
      method: 'get',
      headers: new Headers({
        'Accept': 'application/json'
      }),
    });
    const data = await response.json();
    console.log("Fetched Data:", data);
  };

  return (
    <>
      <header>
        <h1>Flixster</h1>
        <Search />
      </header>
      <div className="App">
        <MovieList />
      </div>
      <footer>
        <button id="loadbtn">Load More</button>
      </footer>
    </>
  );
}

export default App;



