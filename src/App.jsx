import './App.css';
import MovieList from './MovieList';
import LoadMore from './LoadMore';
import SearchBar from './SearchBar';
import {useState, useEffect} from 'react';

const App = () => {

  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);

  const fetchData = async () => {
    let url = 'https://api.themoviedb.org/3/movie/now_playing'
    const apiKey = import.meta.env.VITE_API_KEY
    url += `?api_key=${apiKey}`
    // url += `&page=${page}`
    
    const response = await fetch(url)
    const data= await response.json()
    console.log(data.results)
    setMovieList(data.results)
  }
  

  useEffect(() =>{
    fetchData();
  },[]
)

  return(
  <div className="App">
    <header className='App-header'>
      <h1 className='site-title'>Movies</h1>
      <SearchBar/>
    </header>
    <main>
      <MovieList data={movieList} />
    </main>
    <footer className='App-footer'>
      <LoadMore/>
    </footer>
  </div>
  );
}

export default App
