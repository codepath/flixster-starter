import './App.css'
import MovieList from "./MovieList"
import "../public/movie.png"

const App = () => {
  return (
  <div className="App">
    <header className='App-header'>
      <h1>Flixster</h1> 
      <img src="../public/movie.png" alt="" />
      </header>
    <MovieList />
  </div>
  );
}

export default App
