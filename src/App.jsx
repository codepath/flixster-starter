import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './MovieList.jsx';
import SideBar from './SideBar';


function App() {
    //state variable to store movie data
    const [movies, setMovieData] = useState([]);

    //state variable to store page number
    const [pageNumber, setPageNumber] = useState(1);

    //state variable to store user's search items
    const [searchData, setSearchData] = useState('');

    // to switch between tabs between nowPlaying and Search buttons
    const [nowPlayingButton, setnowPlayingButton] = useState('active');
    const [searchButton, setSearchButton] = useState('inactive');

    // to hide and show search bar
    const [displaySearchBarButton, setdisplaySearchBarButton] = useState('hide');

    //import API key from .env file and assign it to a variable
    const apiKey = import.meta.env.VITE_API_KEY;
    let fetchURL = 'https://api.themoviedb.org/3/discover/movie?api_key=abdf86b5a5bfd53f8efefa7cdcb50fa9&language=en-US';

    //create new states FOR SWITCHING BETWEEN FUNCTIONS
    const [fetchBetweenTabs, setFetchBetweenTabs] = useState('now-playing-home');

    //state variable to store sort type
    const [sortType, setSortType] = useState('');

    //state variable to store search data
    const [searchTerm, setSearchTerm] = useState('');

    //state variable to liked movies information
    const [likedMovies, setLikedMovies] = useState([]);

    //state variable to store watched movies information
    const [watchedMovies, setWatchedMovies] = useState([]);

    //state variable to store genre type
    const [genreType, setGenreType] = useState('');

    //function to choose what to display on the page. If it's now playing, it will fetch the data from now-playing endpoint.
    // If sort button is clicked, then it'll fetch the data from sort endpoint
    async function handleDiscoverRequest() {
        try {
            if (fetchBetweenTabs === 'now-playing-home') {
                if (sortType != "") {
                    fetchURL += '&sort_by=' + sortType;
                }
                // if (genreType != "") {
                //     fetchURL += '&with_genres=' + genreType;
                // }
                setMovieData([]);
                setPageNumber(1);
                const response = await fetch(fetchURL);
                const data = await response.json();
                setMovieData(data.results);
            }
            else {
                setMovieData([]);
                setFetchBetweenTabs('search-results');
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    //function to fetch new page of data when user clicks on load more button
    const fetchNewPageMovieData = async () => {
        try {
            if (sortType != "") {
                fetchURL += '&sort_by=' + sortType;
            }
            // if (genreType != "") {
            //     fetchURL += '&with_genres=' + genreType;
            // }
            fetchURL += '&page=' + pageNumber;
            const response = await fetch(fetchURL);
            const data = await response.json();
            setMovieData(movies.concat(data.results));
        }
        catch (err) {
            console.log(err);
        }
    }

    //useEffect to fetch if the tab is now playing or search
    useEffect(() => {
        if (fetchBetweenTabs === 'now-playing-home' && searchTerm === '') {
            fetchNewPageMovieData()
        }
        else{
            searchDataValue(searchTerm);
        }
    }, [pageNumber, searchTerm]);

    //function to load more pages of data when user clicks on load more button
    function loadMorePages() {
        setPageNumber(prevpageNumber => prevpageNumber + 1);
    }

    //function to fetch data from search endpoint
    function searchDataValue() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmRmODZiNWE1YmZkNTNmOGVmZWZhN2NkY2I1MGZhOSIsInN1YiI6IjY2Njg4NzllNmU0MTZkMDlhODhiNzYzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h4y2UevgrG927Du8ysa-yc4y9k7D3Yh7zDK2TU8eYEE'
            }
        };
        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchData}&include_adult=false&language=en-US&page=${pageNumber}`, options)
            .then(response => response.json())
            .then(response => setMovieData(movies.concat(response.results)))
            .catch(err => console.error(err));
    }

    //function to display search bar and search button when clicked or to hide them when clicked on now-playing button
    function NowPlaying(event) {
        if (event.target.id === "now-playing") {
            setnowPlayingButton('active');
            setSearchButton('inactive');
            setdisplaySearchBarButton('hide');
            setSortType('');
            setGenreType('')
            setMovieData([]);
            setSearchTerm('');
            handleDiscoverRequest();
        }
        else {
            setnowPlayingButton('inactive');
            setSearchButton('active');
            setdisplaySearchBarButton('show');
            setMovieData([]);
            setSearchTerm('');
        }
    }
    //function to fetch data from sort endpoint based on sort
    useEffect(() => {
        handleDiscoverRequest();
    }, [sortType]);

    //function to move liked movies to the sidebar
     function handlesetLikedMovies(movieID){
        if(likedMovies.includes(movieID)){
            setLikedMovies(previousIDs => previousIDs.filter(previousID => previousID !== movieID));
        }
        else{
            setLikedMovies(previousID => [...previousID, movieID]);
        }
    }

    //function to move watched movies to the sidebar
    function handlesetWatchedMovies(movieID){
        if(watchedMovies.includes(movieID)){
            setWatchedMovies(previousIDs => previousIDs.filter(previousID => previousID !== movieID));
        }
        else{
            setWatchedMovies(previousID => [...previousID, movieID]);
        }
    }


    return (
        <div className='whole-body'>
            <div className='nav-bar'>
                <SideBar favoriteMovies = {likedMovies} watched = {watchedMovies} movies={movies}/>
            </div>

            <div className='body'>
                <header>
                    <div>
                        <div className='header'>
                            <h1 className='title-header'>Flixster</h1>
                            <section className='navigation-bar'>
                                <button id='search-results' className = "button" onClick={NowPlaying}>Search</button>
                                <button id="now-playing" className="button" onClick={NowPlaying}>Now Playing</button>
                                <select className='sort-by button' value={sortType} onChange={(e) => { setSortType(e.target.value) }} id='sortedData'>
                                    <option value="">Choose a Sort</option>
                                    <option value="title.asc">Sort By Title</option>
                                    <option value="primary_release_date.asc">Sort By Date</option>
                                    <option value="vote_average.desc">Sort By Rating</option>
                                    <option value="revenue.desc">Sort By Revenue</option>
                                </select>
                            </section>
                        </div>
                    </div>
                    <section className={displaySearchBarButton}>
                        <input id='search-bar'
                            type="text"
                            className='search-bar'
                            placeholder='Search for a movie...'
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value.toLowerCase())} />
                        <button id='search-results' onClick={() => setSearchTerm(searchData)} >Search</button>
                    </section>
                </header>
                <div className='MovieCard2'>
                    <MovieList data={movies} setWatchedMovie={handlesetWatchedMovies} setFavoriteMovies = {handlesetLikedMovies} />
                </div>
                <footer>
                    <div className='load-more'>
                        <button className='loadMoreButton' onClick={loadMorePages}>Load More</button>
                    </div>
                    <div>
                        <p>2024 Flixster</p>
                    </div>
                </footer>

        </div>
    </div>
    )
}
export default App;
