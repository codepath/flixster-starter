import { useState , useEffect} from 'react'
import './App.css'
import MovieCard from './MovieCard.jsx';
import MovieList from './MovieList.jsx';
import NowPlayingBar from './NowPlayingBar.jsx';
import Modal from './Modal.jsx';
// import SearchBar from './SearchBar.jsx';

function App() {
    const [isSearching, setIsSearching] = useState(false);
    const [requestAPI, setRequestAPI] = useState({'search': 'now-playing', 'page' : 1});
    //state variable to store movie data
    const [movies, setMovies] = useState([]);
    //state variable to store page number
    const [pageNumber, setPageNumber] = useState(1);
    //state variable to store user's search items
    const [searchData, setSearchData] = useState('');
    //state variable to store search results
    const [showModal, setshowModal] = useState(false);
    // to switch between tabs between nowPlaying and Search buttons
    const [nowPlayingButton, setnowPlayingButton] = useState('active');
    const [searchButton, setSearchButton] = useState('inactive');
    // to hide and show search bar
    const [displaySearchBarButton, setdisplaySearchBarButton] = useState('hide')
    //import API key from .env file and assign it to a variable
    const apiKey = import.meta.env.VITE_API_KEY;
    const fetchURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=abdf86b5a5bfd53f8efefa7cdcb50fa9&page=' + pageNumber+ '&language=en-US';

    //function to choose what to display on the page
    const chooseWhatToDisplay = async (URL, target) => {
        try{
            if (target === 'now-playing-home'){
                setMovies([]);
                setPageNumber(1);
                const response = await fetch(URL);
                const data = await response.json();
                setMovies(data.results);

            }

        }
        catch(err){
            console.log(err);
        }
}

        const fetchMovieData = async () => {
            try{
                const response = await fetch(fetchURL);
                const data = await response.json();
                setMovies(movies.concat(data.results));
            }
            catch(err){
                console.log(err);
            }
        }
        useEffect(() => {
        fetchMovieData()}, [pageNumber]);
        console.log(movies);


        function loadMorePages(){
            setPageNumber(prevpageNumber => prevpageNumber+1);
        }

        function searchDataValue(){
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmRmODZiNWE1YmZkNTNmOGVmZWZhN2NkY2I1MGZhOSIsInN1YiI6IjY2Njg4NzllNmU0MTZkMDlhODhiNzYzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h4y2UevgrG927Du8ysa-yc4y9k7D3Yh7zDK2TU8eYEE'
            }
        };
        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchData}&include_adult=false&language=en-US&page=${pageNumber}`, options)
            .then(response => response.json())
            .then(response => setMovies(response.results))
            .catch(err => console.error(err));}

        function NowPlaying(event){
            if (event.target.id === 'now-playing'){
                setnowPlayingButton('active');
                setSearchButton('inactive');
                setdisplaySearchBarButton('hide')
                chooseWhatToDisplay(fetchURL, 'now-playing-home')

            }
            else{
                setnowPlayingButton('inactive');
                setSearchButton('active');
                setdisplaySearchBarButton('show')
                searchDataValue();
            }

        }





    return(
        <div className='body'>
                <header>
                    <h1 className='title-header'>Flixster</h1>
                    <button id='search' onClick={NowPlaying}>Search</button>
                    <button id='now-playing' className="" onClick={NowPlaying}>Now Playing</button>
                    <select className='sort-by'>
                        <label>Sort by</label>
                        <option>Sort By Title</option>
                        <option>Sort By Date</option>
                        <option>Sort By Rating</option>
                    </select>

                    <section className={displaySearchBarButton}>
                        <input id='search-bar'
                            type="text"
                            className='search-bar'
                            placeholder='Search for a movie...'
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value.toLowerCase())}/>
                        <button id='search' onClick={() => searchDataValue(searchData)}>Search</button>
                    </section>
                </header>
                <div className='MovieCard2'>
                    <MovieList data={movies}/>
                </div>
                <footer>
                    <div className='button'>
                        <button className='loadMoreButton' onClick={loadMorePages}>Load More</button>
                    </div>
                    <div>
                        <p>2024 Flixster</p>
                    </div>
                </footer>

        </div>
    )

}
export default App
