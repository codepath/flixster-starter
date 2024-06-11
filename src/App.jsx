import { useState , useEffect} from 'react'
import './App.css'
import MovieCard from './MovieCard.jsx';
import MovieList from './MovieList.jsx';

function App() {
    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
    const fetchURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=0cf11cf1a2cacefffa0ac6bb28bd02b2';
    fetch(fetchURL)
    .then(res => res.json())
    .then(res => setMovies(prevMovies => prevMovies.concat(res.results)))
    .catch(err => console.error(err));}, [pageNumber]);


    function loadMorePages(){
        setPageNumber(prevpageNumber => prevpageNumber + 1);
        useEffect();
    }

    return(
        <div>
            <header>
                <h1>Flixster</h1>
                <input type="text" placeholder='Search for a movie...' className='search-bar'/>
                <button>Search</button>
                <button><label>Sort by</label></button>
            </header>
            <div className='MovieCard2'>
                <MovieList data={movies}/>
            </div>

            <footer>
                <p>2024 Flixster</p>
            </footer>
        </div>
    )
}

export default App
