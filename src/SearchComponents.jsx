import "./SearchComponents.css"
import { use, useEffect, useState } from 'react'
import MovieCard from './MovieCard'
const options = {
      method: 'GET',
      headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGM4OGY3ZWI4ZDU2YThkNWYzYjY3MzI4ZjU2YTM2ZSIsIm5iZiI6MTc0OTUzMzI3OC4yMjcsInN1YiI6IjY4NDdjMjVlZWM3MzI5M2NkN2JiMzZhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uhoqn3XL1sDXT-jJhsIbVMI2gzkhF5hzYOgdF9M8zA0'
}} 
function SearchComponents({setResults}){//to handle the search
    const [searchMovie, setSearchMovie] = useState('') //setting useState to an empty array
    function handleSearchChange(text){
         setSearchMovie(text) //setting searchMovie to change whenever a new text is typed in the input box
    }
    async function handleSearch(e){ //event to happen when you search for a movie
        e.preventDefault()
        const apiKey = import.meta.env.VITE_APP_API_KEY
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchMovie}`,options)
        const data = await response.json()
        console.log(data)

        setResults(data.results) //print out the movies that match the search query as fetched from the API in line 18
    }
    return(
    <form className="Submit">
       <input name = "inputForm" className = 'inputSpace' type="search" placeholder="Search for movies" onChange = {(e) => handleSearchChange(e.target.value)}/>
       <button onClick = {handleSearch} className="searchBtn" type="submit">Search</button>
       <button onClick = {() => {searchMovie(''); ([])}} className="clearBtn">Clear</button>
    </form>
    )
}
export default SearchComponents