import './App.css';
import MovieList from './MovieList';
import Search from './Search';
import { useState, useEffect } from 'react';

function App() {
  const [movieData, setMovieData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchData()
   }, [])

  useEffect(() => {
    const filterSearchData = () => {
      if(!searchQuery) {
        setSearchData(movieData);
      } else {
        const filteredData = movieData.filter(movie =>
          movie.title.toUpperCase().includes(searchQuery.toUpperCase())
        );
        setSearchData(filteredData); 
      }
    };
    filterSearchData();
  }, [searchQuery, movieData]);

  useEffect(() => {
    console.log('click')
    fetchData()
  }, [page]);

  const increment = () => {
    setPage(page+1)
  };

  const fetchData = async () => {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&api_key=${import.meta.env.VITE_API_KEY}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.results)
      setMovieData(movieData.concat(data.results));
  } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  


  return (
    <>  
      <header>
        <h1>Flixster</h1>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      </header>
      <div className="App">
        <MovieList data={searchData}/>
      </div>
      <footer>
      <button id="loadbtn" onClick={increment}>Load More</button>
      </footer>
    </>
      
  );
}

export default App;



