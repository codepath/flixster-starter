import './App.css';
import MovieList from './MovieList';
import LoadMore from './LoadMore';
import SearchBar from './SearchBar';
import {useState, useEffect} from 'react';

const App = () => {

//   const fetchData = async () => {
//     const apiKey = import.meta.env.VITE_API_KEY;
//     const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1')
//   }

  return(
  <div className="App">
    <header className='App-header'>
      <h1 className='site-title'>Movies</h1>
      <SearchBar/>
    </header>
    <main>
      <MovieList/>
    </main>
    <footer className='App-footer'>
      <LoadMore/>
    </footer>
  </div>
  );
}

export default App
