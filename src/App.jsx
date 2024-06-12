import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import.meta.env.VITE_API_KEY;
import NowPlayingScreen from './components/NowPlayingScreen';
import SearchScreen from './components/SearchScreen.jsx';

const App = () => {
  const [isSearching, setSearching] = useState(false);
  const [criteria, setCriteria] = useState("")

  const handleNewCriteria = (criteriaFromHeader) => {
    setCriteria(criteriaFromHeader)
  }

  return (
    <div className="App">
      <Header sortMovies={handleNewCriteria} setSearching={setSearching} />
      {!isSearching ?
        <NowPlayingScreen sortMovies={handleNewCriteria} criteriaFromHeader={criteria} />
        :
        <SearchScreen />
      }
    </div>
  );
}

export default App;
