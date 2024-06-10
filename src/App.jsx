import './App.css'
import MovieList from './MovieList'
function App () {
  return (

    // {
    //   const fetchData = async () => {
    //     const key = import.meta.env.VITE_API_KEY;
    //     const repsonse = await fetch('https://api.themoviedb.org/3/configuration');
    //     const data = await response.json();

    //   }


    // }
    <div className="App">
      <MovieList/>
    </div>
  )
}

export default App
