import './App.css'
import MovieList from './MovieList'
import Search from './Search';
function App () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTEwYzJkZTdjZGQyYTNjOTM4YzEwMTBmOTk5ZDI0MSIsInN1YiI6IjY2Njc2NzI2NTM1YjMyMTc5Nzg1YTVkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0Oh7jejjYFuQKbX-ZZkuCE2i7C_Nn5FmfKNwADZt6aQ'
    }
  };
  
  fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


  return (
    <>
      <header>
          <h1>Flixster</h1>
          <Search/>
      </header>
      <div className="App">
        <MovieList/>
    </div>
    <footer>
      <button id="loadbtn">Load More</button>
    </footer>
    </>
  )
}

export default App
