import { useState , useEffect} from 'react'
import './App.css'
import MovieCard from './MovieCard.jsx';
import MovieList from './MovieList.jsx';

function App() {
    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
    const fetchURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=abdf86b5a5bfd53f8efefa7cdcb50fa9&page=' + pageNumber.toString()+ '&language=en-US';
    fetch(fetchURL)
    .then(res => res.json())
    .then(res => setMovies([...movies, ...res.results]))
    .catch(err => console.error(err));}, [pageNumber]);

    function loadMorePages(){
        setPageNumber(prevpageNumber => prevpageNumber+1);
    }

    function searchData(e){
        e.preventDefault();
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=abdf86b5a5bfd53f8efefa7cdcb50fa9&page=' + pageNumber.toString()+ '&language=en-US?&query='+ search.toString() + '&language=en-US')
        .then(res => res.json())
        .then(data => setSearchResults([data.results]))
        .catch(err => console.error(err));
    }

    console.log(search)

    return(
        <div>
            <header>
                <h1 className='title-header'>Flixster</h1>
                <input id='search-bar' type="text" className='search-bar' placeholder='Search for a movie...' value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
                <button className='search' onClick={searchData}>Search</button>
                <button className='sort-by'><label>Sort by</label></button>
            </header>
            <div className='MovieCard2'>
                <MovieList data={movies}/>
            </div>
            <footer>
                <div className='button'>
                    <button onClick={loadMorePages} className='loadMoreButton'>Load More</button>
                </div>
                <div>
                    <p>2024 Flixster</p>
                </div>
            </footer>
        </div>
    )
}

export default App
