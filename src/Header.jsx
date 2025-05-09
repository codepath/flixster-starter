import './Header.css';
import SortBy from './SortBy';

function Header({ setIsSearching, sortMovies }) {



  return (
    <header className="header">
      <h1>Flixster</h1>
      <div className="sort-container">
        <select className="sort-by" onChange={(e) => sortMovies(e.target.value)}>
          <option value="">Select Sort Criteria</option>
          <option value="primary_release_date.asc">Sort by Most Recent Release</option>
          <option value="primary_release_date.desc">Sort by Oldest Release</option>
          <option value="vote_average.asc">Sort by Lowest Rating</option>
          <option value="vote_average.desc">Sort by Highest Rating</option>
          <option value="genre">Sort by Genre</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
