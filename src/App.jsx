import './App.css';
import MovieList from './MovieList';

const App = () => {

  

  return(
  <div className="App">
    <header className='App-header'>
      <h1 className='site-title'>Movies</h1>
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
