import { useState, useEffect } from 'react';
import './NowPlaying.css';
import MovieList from './MovieList';
import Modal from './Modal';

const NowPlaying = ({ sortCriteria }) => {
    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWU5YTZiOThlMTBjZDkyZTcxN2Y4OWIzZDYxYjdjNSIsInN1YiI6IjY2NjY1MTQ1Y2M3MDc0ZDliNjFjMWM2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IDf1-04fWbMoc-zzed3BAcZLflL14UG-mdjcZobVjxA'
            }
        };
        console.log("fetching new movies")
        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`, options)
            .then(response => response.json())
            //   .then(response => handleSortMovies(sortCriteria, movies.concat(response.results)))
            .then(response => {
                console.log("new movies", response.results)
                return response
            })
            .then(response => setMovies(movies.concat(response.results)))
            .catch(err => console.error(err));
    }, [pageNumber]);

    useEffect(() => {
        console.log("sorting movies")
        handleSortMovies(sortCriteria);
    }, [sortCriteria])

    const loadNewPages = () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    const getMovieInfo = (movie) => {
        setIsModalOpen(true);
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    const handleSortMovies = (criteria, movieList = movies) => {
        const copyMovies = [...movieList];
        copyMovies.sort((a, b) => {
            if (criteria === 'title') {
                return a.title.localeCompare(b.title);
            } else if (criteria === 'release_date') {
                return new Date(a.release_date) - new Date(b.release_date);
            } else if (criteria === 'vote_average') {
                return b.vote_average - a.vote_average;
            }
            return 0;
        });

        console.log("sorted movies", copyMovies, movieList)

        setMovies(copyMovies);
    };

    return (
        <div className="now-playing">
            <main>
                {isModalOpen && <Modal movie={selectedMovie} onClose={handleCloseModal} />}
                <MovieList data={movies} getMovieInfo={getMovieInfo} />
                <button onClick={loadNewPages}>Load More</button>
            </main>
        </div>
    );
};

export default NowPlaying;
