import './App.css';
import MovieList from './components/MovieList';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>🎬 Flixster</h1>
      </header>

      <main>
        <MovieList />
      </main>

      <footer>
        © {new Date().getFullYear()} Flixster by Jennifer 💖
      </footer>
    </div>
  );
};

export default App;
