import React from 'react';
import MovieList from './MovieList';
import Search from './Search';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  // const [modal, setModal] = useState(false);
  const [movieID, setMovieID] = useState('');
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    getMovies();
  }, [page])

  useEffect(() => {
    searchMovies()
  }, [searchValue])

  const loadMore = () => {
    setPage(page => page + 1);
};

  const movieClick = (movieId) => {
    setMovieID(movieId);
  }

  const getMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&api_key=0d7613c1b95dbc61f3dd491c8f802475`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };

    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    if (page === 1){
      setMovies(jsonResponse.results)
    } else {
      setMovies(prevMovies => [...prevMovies, ...jsonResponse.results])
    }

  }

  const searchMovies = async () => {
    const result = searchValue.replace(/ +/g, '+');
    const url = `https://api.themoviedb.org/3/search/movie?query=${result}&api_key=0d7613c1b95dbc61f3dd491c8f802475`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };
    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    const results = jsonResponse.results.filter((movie) => {
      return movie.title && movie.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    if (results.length === 0){
      return "Try again, No results found :)"
    }else {
      setMovies(results);
    }

  }




  return (
    <>
    <header className="header">
      <h1 className="title">Flixster</h1>
      <Search className="searchForm" searchValue={searchValue} setSearchValue={setSearchValue}/>

      <button id="nowPlayingButton" onClick={() => {
          const form = document.getElementsByClassName("searchForm")[0];
          const loadButton = document.getElementById('load-more');
          form.style.display = 'none';
          loadButton.style.display = 'grid';
          loadButton.style.marginLeft = '40%';
          getMovies();
      }}>Now Playing</button>

      <button id="searchTabButton" onClick={() => {
        const form = document.getElementsByClassName("searchForm")[0];
        const loadButton = document.getElementById('load-more');
        form.style.display = 'block';
        loadButton.style.display = 'none';
        searchMovies();
        }}>Search</button>
    </header>
    <MovieList data={movies} loadMore={loadMore} handleMovieClick={movieClick}/>
    </>
  )
}

export default App;
