import './App.css'
import MovieList from "./MovieList"
// import Search from './Search'
import "../public/movie.png"

const App = () => {
  return (
  <div className="App">
    <header className='App-header'>
      <div className='title'>
        <h1>Flixster</h1> 
        <img src="../public/movie.png" alt="" />
      </div>
      </header>
    <MovieList />

  </div>
  );
}

export default App
