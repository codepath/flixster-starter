import { useState } from 'react';
import './App.css';
import Header from './Header';
import NowPlaying from './NowPlaying';
import Searching from './Searching';

const App = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('release_date');

  const toggleScreen = () => {
    setIsSearching(prevState => !prevState);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  return (
    <div className="App">
      <Header setIsSearching={setIsSearching} sortMovies={handleSortChange} />
      <main>
        <button onClick={toggleScreen} className="toggle-button">
          {isSearching ? 'Now Playing' : 'Search'}
        </button>
        {isSearching ? <Searching /> : <NowPlaying sortCriteria={sortCriteria} />}
      </main>
    </div>
  );
};

export default App;
