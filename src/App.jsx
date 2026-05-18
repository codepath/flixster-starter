import { useState, useEffect } from 'react'
import Header from './Header'
import Body from './Body'
import SideNav from './components/SideNav'
import Footer from './Footer'
import sort from './utils/utils'
import './App.css'

//API Info for fetch
const API_KEY = import.meta.env.VITE_API_KEY
const options = {method: 'GET', headers: {accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`}}

const App = () => {
  //States to store the current movie data
  const [movieData, setMovieData] = useState([])
  const [pageNum, setPageNum] = useState(1)

  //State Arrays for fav and watched movies
  const [page,setPage] = useState('Home')
  const [favMovies, setFavMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])

  //States to store search information
  const [searchData, setSearchData] = useState([])
  const [searchPage, setSearchPage] = useState(0)
  const [searchString, setSearchString] = useState('')
  const [searchTrigger, setSearchTrigger] = useState(0)

  //URL for featching data from API
  const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchString}&page=${searchPage}`

  //States for sort
  const [sortType, setSortType] = useState('none')

  //Rerender movie data whenever url for api call changed and append to movie data
  useEffect(() => {
      const fetchMovieData =  async () => {
          try{
              let searching = (searchString !== '');
              let URL = searching ? searchURL : nowPlayingURL;
              var res = await fetch(URL, options)
              if(res.ok){
                  const data = await res.json();

                  //Update movie data to store liked/watched info
                  data.results.forEach((movie) => {
                    movie.liked = false
                    movie.watched = false
                  })

                  if(searchString === ''){
                    setMovieData([...movieData, ...data.results]);
                  }else {
                    setSearchData([...searchData, ...data.results])
                  }
              }else{
                  throw new Error("API Not Responding")
              }
          }catch(error){
              console.error("Error: ", error.message)
          }
      }
      fetchMovieData();
  },[pageNum, searchTrigger])

  //Load more movie data by updating page num on url
  const load = () => {
    if(searchString === '') {
      setPageNum(pageNum + 1)
    }else {
      setSearchPage(searchPage + 1)
      setSearchTrigger(searchTrigger + 1)
    }
  }

  //**-----------------Search Function-----------------**//
  const clearSearch = () => {
    setSearchData([])
    setSearchString('')
    setPage('Home')
  }

  const search = () => {
    if(searchString === ''){
      return;
    }
    setSearchPage(1, setPage('Search'))
    setSearchTrigger(searchTrigger + 1)
  }

  const updateSearchTerm = evt => {
    setSearchString(evt.target.value)
  }
  //**--------------------------------------------------**//

  //**------------------Sort Function-------------------**//

  useEffect(() => {
    const sortedMovies = sort(movieData,sortType)
    setMovieData(sortedMovies)
  },[sortType])


  const updateSortType = evt => {
    setSortType(evt.target.value)
  }

  //**--------------------------------------------------**//

  //**---------------Like/Watch Function----------------**//

  const openHome = () => {
    setPage('Home')
  }

  const updateFavs = (movie) => {
    if(movie.liked){
      setFavMovies([...favMovies, movie]) 
    }else{
      setFavMovies(favMovies.filter(element => element !== movie));
    }
  }

  const openFavorites = () => {
    setPage('Favorites')
  }

  const updateWatched = (movie) => {
    if(movie.watched){
      setWatchedMovies([...watchedMovies, movie]) 
    }else{
        setWatchedMovies(watchedMovies.filter(element => element !== movie));
    }
  }

  const openWatched = () => {
    setPage('Watched')
  }

  //**--------------------------------------------------**//

  return (
    <div className="App">
      <Header clear={clearSearch}  search={search} searchTermFunction={updateSearchTerm} 
              searchString={searchString} sortFunc={updateSortType} display={page === 'Home' || page === 'Search'}/>

      <SideNav homeFunc={openHome} favFunc={openFavorites} watchFunc={openWatched}/>

      <Body data={page !== 'Home' ? (page !== 'Favorites' ? (page === 'Watched' ? watchedMovies : searchData) : favMovies) : movieData} load={load}
            addToFav={updateFavs} addToWatch={updateWatched} display={page === 'Home' || page === 'Search'}/>

      <Footer />
    </div>
  )
}

export default App
