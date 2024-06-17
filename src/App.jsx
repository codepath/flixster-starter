import { useState } from 'react'
import './App.css'
import React from 'react'
import MovieCard from './MovieCard'
import MovieList from './MovieList'
import Modal from './Modal'


const App = () => {
  let search;

  return(  
  <div className="App">
    <MovieList/>
  </div>
)
}

export default App
