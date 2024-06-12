import './App.css';
import MovieList from './MovieList';
import SearchBar from './SearchBar';

const App = () => {

  

  return(
  <div className="App">
    <header className='App-header'>
      <h1 className='site-title'>Movies</h1>
      <SearchBar/>
    </header>
    <main>
      <MovieList />
    </main>
    <footer className='App-footer'>
    </footer>
  </div>
  );
}

export default App
