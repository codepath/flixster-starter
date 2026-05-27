import { useEffect, useState } from 'react'
import './App.css'
import './components/PopupModal.css'
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import SearchFunction from './components/SearchFunction';
import SortBy from "./components/SortBy"


const App = () => {    
  const [movies, setMovies] = useState([]);    
  const [pageNum, setPageNum] = useState(1)

  const handleClick = () => {
      setPageNum((pageNum) => {return pageNum + 1})
    };

  const ViteAPI = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    if(pageNum === 0) {
      setPageNum(1)
      return;
    }
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${ViteAPI}&page=${pageNum}`)
      .then(response => response.json())
      .then(data => setMovies([...movies, ...data.results]))
  }, [pageNum]);

    const fetchMovies = async (currentPage, search = '') => {
      const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${ViteAPI}&query=${search}&page=${currentPage}`;
      const response = await fetch(searchURL);
      const data = await response.json();
      const movies = data.results;
      setMovies(movies);
    };

  const sortMovies = (type) => {
    if (type === 'Rating') {
      const currentMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average)
      setMovies(currentMovies);
    } else if (type === "A-Z") {
      const currentMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title))
      setMovies(currentMovies);
    } else if (type === "Date") {
      const currentMovies = [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      setMovies(currentMovies);
    } else if (type === "") {
      onClearing()
    }
  }

  const onClearing = () => {
    setMovies([])
    setPageNum(0)
  }

  return (
    <div className="App">
      <header>
        <Header/>
        <div className='banner'>
          <div className='searchButton'>
            <SearchFunction fetchMovies={fetchMovies} onClearing={onClearing}/>
          </div>
          <div className='sortButton'>
            <SortBy sortMovies={sortMovies}/>
          </div>
        </div>
      </header>
      <div className='body'>
        <MovieCard movies={movies} handleClick={handleClick}/>
      </div>
      <div className='loadButton'>
        <button type="button" onClick={handleClick}>Load More</button>
      </div>
      <footer className='footer'>
        <p>© 2025 Flixster. All Rights Reserved.</p>
        <p>Created By: Paloma Levy</p>
      </footer>
    </div>
  )
}


  

export default App
