import { useState, useEffect } from 'react';
import './NowPlaying.css';
import MovieList from './MovieList';
import Modal from './Modal';

const NowPlaying = ({ sortCriteria, favorites, setFavorites, watched, setWatched, movies, loadNewPages }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  console.log(sortCriteria);
//   if sortCriteria === '' or "nowplaying" then sort by popularity.desc




//   useEffect(() => {
//     handleSortMovies(sortCriteria);
//   }, [sortCriteria]);



  const getMovieInfo = (movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

//   const handleSortMovies = (criteria, movieList = movies) => {
//     const copyMovies = [...movieList];
//     copyMovies.sort((a, b) => {
//       if (criteria === 'title') {
//         return a.title.localeCompare(b.title);
//       } else if (criteria === 'release_date') {
//         return new Date(a.release_date) - new Date(b.release_date);
//       } else if (criteria === 'vote_average') {
//         return b.vote_average - a.vote_average;
//       }
//       return 0;
//     });

//     setMovies(copyMovies);
//   };

  return (
    <div className="now-playing">
      <main>
        {isModalOpen && <Modal movie={selectedMovie} onClose={handleCloseModal} />}
        <MovieList
          data={movies}
          getMovieInfo={getMovieInfo}
          favorites={favorites}
          setFavorites={setFavorites}
          watched={watched}
          setWatched={setWatched}
        />
        <button onClick={loadNewPages}>Load More</button>
      </main>
    </div>
  );
};

export default NowPlaying;
